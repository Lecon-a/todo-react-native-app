import { mutation, query } from "./_generated/server";
import { v, ConvexError } from "convex/values";

export const getTodos = query({
    handler: async (ctx) => { 
        return await ctx.db.query("todos").order('desc').collect();
    }
});

// mutation function to add a new todo
export const addTodo = mutation({
    args: {
        text: v.string()
    },
    handler: async (ctx, args) => {
        if (args.text.trim().length === 0) {
            throw new ConvexError("Todo text cannot be empty");
        }
        const todoId = await ctx.db.insert("todos", {
            text: args.text,
            isCompleted: false
        });
        return todoId;
    },
});

// toggle todo completion status
export const toggleTodo = mutation({
    args: {id: v.id("todos")},
    handler: async (ctx, args) => { 
        const todo = await ctx.db.get(args.id);
        if (!todo) {
            throw new ConvexError("Todo not found");
        }
        return await ctx.db.patch(args.id, {
            isCompleted: !todo.isCompleted
        })
    }
})

// update a todo
export const editTodo = mutation({
    args: {
        id: v.id("todos"),
        text: v.string()
    },
    handler: async (ctx, args) => { 
        const todo = await ctx.db.get(args.id);
        if (!todo) {
            throw new ConvexError("Todo not found");
        }
        await ctx.db.patch(args.id, {
            text: args.text
        })
    }
})

// delete a todo
export const deleteTodo = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) => {
        const todo = await ctx.db.get(args.id);
        if (!todo) {
            throw new ConvexError("Todo not found");
        }
        await ctx.db.delete(args.id);
    }
})

// clear all todos
export const clearTodos = mutation({
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").collect();
        if (todos.length === 0) {
            throw new ConvexError("No todos to clear");
        }
        for (const todo of todos) {
            await ctx.db.delete(todo._id);
        }
        return {deletedCount: todos.length};
    }
})