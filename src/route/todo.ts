import { OpenAPIHono } from "@hono/zod-openapi";
import {
	createTodoRoute,
	deleteTodoRoute,
	detailTodoRoute,
	listTodoRoute,
	updateTodoRoute,
} from "../schema/todo";

export const app = new OpenAPIHono();

app.openapi(listTodoRoute, (c) => {
	const { page, page_size, search } = c.req.valid("query");
	const validatedPage = parseInt(page) || 1;
	const validatedPageSize = parseInt(page_size) || 10;
	console.log(search);

	return c.json(
		{
			page: validatedPage,
			page_size: validatedPageSize,
			num_page: 1,
			num_data: 2,
			results: [
				{
					id: 1,
					name: "todo 1",
					is_done: true,
				},
				{
					id: 2,
					name: "todo 2",
					is_done: false,
				},
			],
		},
		200,
	);
});

app.openapi(detailTodoRoute, (c) => {
	const { todo_id } = c.req.valid("param");
	const validatedTodoId = parseInt(todo_id);
	if (!validatedTodoId) {
		return c.json(
			{
				message: "todo not found",
			},
			404,
		);
	}

	const todo = {
		id: 1,
		name: "todo 1",
		is_done: true,
	};
	if (!todo) {
		return c.json(
			{
				message: "todo not found",
			},
			404,
		);
	}

	return c.json(todo, 200);
});

app.openapi(createTodoRoute, (c) => {
	const payload = c.req.valid("json");

	return c.json(
		{
			id: 10,
			...payload,
		},
		201,
	);
});

app.openapi(updateTodoRoute, (c) => {
	const { todo_id } = c.req.valid("param");
	const payload = c.req.valid("json");
	const validatedTodoId = parseInt(todo_id);

	if (!validatedTodoId) {
		return c.json(
			{
				message: "todo not found",
			},
			404,
		);
	}

	const todo = {
		id: 1,
		name: "todo 1",
		is_done: true,
	};
	if (!todo) {
		return c.json(
			{
				message: "todo not found",
			},
			404,
		);
	}

	return c.json(
		{
			id: validatedTodoId,
			...payload,
		},
		200,
	);
});

app.openapi(deleteTodoRoute, (c) => {
	const { todo_id } = c.req.valid("param");
	const validatedTodoId = parseInt(todo_id);

	if (!validatedTodoId) {
		return c.json(
			{
				message: "todo not found",
			},
			404,
		);
	}

	const todo = {
		id: 1,
		name: "todo 1",
		is_done: true,
	};
	if (!todo) {
		return c.json(
			{
				message: "todo not found",
			},
			404,
		);
	}

	return c.json(null, 204);
});
