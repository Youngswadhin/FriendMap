import { PrismaClient } from '@prisma/client'
import express from 'express'
import prisma from '../../prisma/prisma'

const searchRouter = express.Router()

/**
 * @swagger
 * /search/{string}:
 *   get:
 *     summary: Search for users by name or email
 *     tags: [Search]
 *     parameters:
 *       - in: path
 *         name: string
 *         required: true
 *         schema:
 *           type: string
 *         description: The search string to look for in user names and emails
 *     responses:
 *       200:
 *         description: A list of users matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
searchRouter.get('/:string', async (req, res) => {
  const searchString = req.params.string
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [{ name: { contains: searchString, mode: 'insensitive' } }, { email: { contains: searchString, mode: 'insensitive' } }],
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default searchRouter
