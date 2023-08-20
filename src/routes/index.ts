import { Router } from "express";
import fg from "fast-glob"; // Import fast-glob

export async function registerRoutes(router: Router): Promise<void> {
  const routeFiles = fg.sync(["**/*.route.*"], { cwd: __dirname });

  for (const routeFile of routeFiles) {
    await register(routeFile, router);
  }
}

async function register(routeFile: string, router: Router) {
  const routePath = `./${routeFile}`;
  const route = require(routePath);
  route.register(router);
}
