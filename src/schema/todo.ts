import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

// shareable schema
export const BadRequestResponse = z.object({
	message: z.string(),
});

export const UnauthorizedResponse = z.object({
	message: z.string().default("Unauthorized"),
});

export const NotFoundResponse = z.object({
	message: z.string(),
});

export const InternalServerErrorResponse = z.object({
	error: z.string(),
});

// List Todo
export const listTodoRoute = createRoute({
	method: "get",
	path: "/",
	request: {
		query: z.object({
			page: z.string().openapi({
				param: {
					name: "page",
					in: "query",
				},
				type: "number",
				example: "1",
			}),
			page_size: z.string().openapi({
				param: {
					name: "page_size",
					in: "query",
				},
				type: "number",
				example: "10",
			}),
			search: z.string().optional(),
		}),
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: z.object({
						page: z.number(),
						page_size: z.number(),
						num_page: z.number(),
						num_data: z.number(),
						results: z.array(
							z.object({
								id: z.number(),
								name: z.string(),
								is_done: z.boolean(),
							}),
						),
					}),
				},
			},
			description: "list todo",
		},
		401: {
			content: {
				"application/json": {
					schema: UnauthorizedResponse,
				},
			},
			description: "Unautorized",
		},
		500: {
			content: {
				"application/json": {
					schema: InternalServerErrorResponse,
				},
			},
			description: "Internal Server Error",
		},
	},
	tags: ["Todo"],
});

// Detail Todo
export const detailTodoRoute = createRoute({
	method: "get",
	path: "/{todo_id}",
	request: {
		params: z.object({
			todo_id: z.string().openapi({
				param: {
					name: "todo_id",
					in: "path",
				},
				type: "number",
				example: "1",
			}),
		}),
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: z.object({
						id: z.number(),
						name: z.string(),
						is_done: z.boolean(),
					}),
				},
			},
			description: "detail todo",
		},
		404: {
			content: {
				"application/json": {
					schema: NotFoundResponse,
				},
			},
			description: "todo not found",
		},
		500: {
			content: {
				"application/json": {
					schema: InternalServerErrorResponse,
				},
			},
			description: "Internal server error",
		},
	},
	tags: ["Todo"],
});

// Create Todo
export const createTodoRoute = createRoute({
	method: "post",
	path: "/",
	request: {
		body: {
			content: {
				"application/json": {
					schema: z.object({
						name: z.string(),
						is_done: z.boolean(),
					}),
				},
			},
		},
	},
	responses: {
		201: {
			content: {
				"application/json": {
					schema: z.object({
						id: z.number(),
						name: z.string(),
						is_done: z.boolean(),
					}),
				},
			},
			description: "todo created",
		},
		500: {
			content: {
				"application/json": {
					schema: InternalServerErrorResponse,
				},
			},
			description: "Internal server error",
		},
	},
	tags: ["Todo"],
});

// Update Todo
export const updateTodoRoute = createRoute({
	method: "put",
	path: "/{todo_id}",
	request: {
		params: z.object({
			todo_id: z.string().openapi({
				param: {
					name: "todo_id",
					in: "path",
				},
				type: "number",
				example: "1",
			}),
		}),
		body: {
			content: {
				"application/json": {
					schema: z.object({
						name: z.string(),
						is_done: z.boolean(),
					}),
				},
			},
		},
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: z.object({
						id: z.number(),
						name: z.string(),
						is_done: z.boolean(),
					}),
				},
			},
			description: "todo created",
		},
		404: {
			content: {
				"application/json": {
					schema: NotFoundResponse,
				},
			},
			description: "todo not found",
		},
		500: {
			content: {
				"application/json": {
					schema: InternalServerErrorResponse,
				},
			},
			description: "Internal server error",
		},
	},
	tags: ["Todo"],
});

// Delete Todo
export const deleteTodoRoute = createRoute({
	method: "delete",
	path: "/{todo_id}",
	request: {
		params: z.object({
			todo_id: z.string().openapi({
				param: {
					name: "todo_id",
					in: "path",
				},
				type: "number",
				example: "1",
			}),
		}),
	},
	responses: {
		204: {
			content: {
				"application/json": {
					schema: z.null(),
				},
			},
			description: "detail todo",
		},
		404: {
			content: {
				"application/json": {
					schema: NotFoundResponse,
				},
			},
			description: "todo not found",
		},
		500: {
			content: {
				"application/json": {
					schema: InternalServerErrorResponse,
				},
			},
			description: "Internal server error",
		},
	},
	tags: ["Todo"],
});
