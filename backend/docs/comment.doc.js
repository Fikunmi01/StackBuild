/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Operations related to comments on posts
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *         username:
 *           type: string
 *     Quote:
 *       type: object
 *       properties:
 *         quote:
 *           type: string
 *         username:
 *           type: string
 *     Like:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *     Post:
 *       type: object
 *       properties:
 *         postId:
 *           type: string
 *         comments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Comment'
 */

/**
 * @swagger
 * /posts/{postId}/comments:
 *   post:
 *     summary: Add a new comment to a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /posts/{postId}/comments/quote:
 *   post:
 *     summary: Quote a comment on a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentId:
 *                 type: string
 *               quote:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Comment quoted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '404':
 *         description: Post or comment not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /posts/{postId}/comments/like:
 *   post:
 *     summary: Like or unlike a comment on a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Comment liked/unliked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '404':
 *         description: Post or comment not found
 *       '500':
 *         description: Internal server error
 */
