/**
 * @swagger
 * tags:
 *   name: Records
 *   description: API para gerenciar registros financeiros
 *
 * components:
 *   schemas:
 *     RecordInput:
 *       type: object
 *       required:
 *         - date
 *         - amount
 *         - type
 *         - description
 *       properties:
 *         date:
 *           type: string
 *           description: Data no formato dd/MM/yyyy
 *           example: "04/06/2025"
 *         amount:
 *           type: number
 *           example: 100.5
 *         type:
 *           type: string
 *           enum: [CREDIT, DEBIT]
 *           example: DEBIT
 *         description:
 *           type: string
 *           example: Compra mercado
 *
 *     Record:
 *       allOf:
 *         - $ref: '#/components/schemas/RecordInput'
 *         - type: object
 *           required:
 *             - id
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *
 * /records:
 *   get:
 *     summary: Retorna todos os registros
 *     tags: [Records]
 *     responses:
 *       200:
 *         description: Lista de registros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Record'
 *   post:
 *     summary: Cria um novo registro
 *     tags: [Records]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecordInput'
 *     responses:
 *       201:
 *         description: Registro criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Record'
 *       400:
 *         description: Dados inválidos
 *
 * /records/{id}:
 *   get:
 *     summary: Busca um registro pelo ID
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Record'
 *       404:
 *         description: Registro não encontrado
 *   put:
 *     summary: Atualiza um registro pelo ID
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecordInput'
 *     responses:
 *       200:
 *         description: Registro atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Record'
 *       404:
 *         description: Registro não encontrado
 *   delete:
 *     summary: Remove um registro pelo ID
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Registro removido com sucesso
 *       404:
 *         description: Registro não encontrado
 *
 * /records/grouped:
 *   get:
 *     summary: Registros agrupados por mês/ano com totais de crédito e débito
 *     tags: [Records]
 *     responses:
 *       200:
 *         description: Registros agrupados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   monthYear:
 *                     type: string
 *                     example: "04/2025"
 *                   records:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Record'
 *                   totalCredit:
 *                     type: number
 *                     example: 1500
 *                   totalDebit:
 *                     type: number
 *                     example: 700
 *       500:
 *         description: Erro ao agrupar registros
 */
