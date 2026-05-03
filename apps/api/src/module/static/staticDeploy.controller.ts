import fs from 'node:fs';
import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { staticDeployService } from './staticDeploy.service.js';

// --- Serve static assets -------------------
export const StaticDeployment = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const rawPath = req.params.path;

    const requestedPath = Array.isArray(rawPath)
      ? rawPath.join('/')
      : rawPath || 'index.html';

    const result = await staticDeployService.staticDeployment(
      id as string,
      requestedPath,
    );

    // serve normal static assets directly
    if (!result.isHtml) {
      return res.sendFile(result.filePath);
    }

    // rewrite asset paths inside index.html
    let html = fs.readFileSync(result.filePath, 'utf-8');

    // inject <base> tag safely inside <head>
    html = html.replace(
      /<head[^>]*>/i,
      (match) => `${match}<base href="/api/deploy/${id as string}/">`,
    );

    // 2. rewrite absolute paths → make them relative to deployment
    html = html.replace(
      /(src|href)=["']\/(.*?)["']/g,
      `$1="/api/deploy/${id as string}/$2"`,
    );

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  },
);
