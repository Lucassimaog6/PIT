import { Router } from "express";
import { createProject, getProject, getProjectsByDate, getProjectsByUpvotes, upvoteProject, downvoteProject, getProjectsByDificulty, addComment, newWorkingUser, verifyWorkingUser } from "../controllers/Project.controllers";

export const projectRouter = Router();

projectRouter.get("/date", getProjectsByDate);
projectRouter.get("/upvotes", getProjectsByUpvotes);
projectRouter.get("/:id", getProject);
projectRouter.post("/", createProject);
projectRouter.put("/upvote/:id", upvoteProject);
projectRouter.put("/downvote/:id", downvoteProject);
projectRouter.post("/dificulty/", getProjectsByDificulty);
projectRouter.post("/comment/:id", addComment);
projectRouter.put("/working/:id", newWorkingUser);
projectRouter.post("/working/verify/:id", verifyWorkingUser);
