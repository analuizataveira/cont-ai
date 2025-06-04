import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";
import * as bcrypt from "bcrypt";

// Get the User repository from the database connection
const repo = AppDataSource.getRepository(User);

// Function to create new user with email and hashed password
export async function  createUser (req: Request, res: Response) {
  // Extract email and password from request body
  const { email, password } = req.body;
  // Check if user with this email already exists
  const existingUser = await repo.findOne({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ error: "User already exists" });
  }

  // Hash the password with bcrypt (10 salt rounds)
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create and save new user with hashed password
  const user = repo.create({ email, password: hashedPassword });
  await repo.save(user);

  // Return success response
  res.status(201).json({ message: "User created successfully" });
};

// Function to handle user login
export async function login (req: Request, res: Response) {
  // Extract email and password from request body
  const { email, password } = req.body;

  // Find user by email
  const user = await repo.findOne({ where: { email } });

  // If user doesn't exist, return error
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Compare provided password with stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Return success response with user details
  res.status(200).json({
    message: "Login successful",
    userId: user.id,
    email: user.email,
  });
};

// Function to get all users from the database
export async function getUsers (_: Request, res: Response) {
  // Find all users in database
  const users = await repo.find();
  
  // Return users as JSON response
  res.json(users);
}