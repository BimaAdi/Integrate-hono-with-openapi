import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { z } from "zod";

export const app = new OpenAPIHono();

const fooRoute = createRoute({
	method: "get",
	path: "/other/",
	responses: {
		200: {
			content: {
				"application/json": {
					schema: z.object({
						foo: z.string(),
					}),
				},
			},
			description: "foo response",
		},
	},
	tags: ["Foo"], // <- Add tag here
});

app.openapi(fooRoute, (c) => {
	return c.json({ foo: "hello foo" }, 200);
});
