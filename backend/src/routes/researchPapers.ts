import express from 'express';
import { createResearchPaper, getAllResearchPapers, getResearchPaperById } from '../controllers/researchPaperController';
import { authenticate } from '../middleware/auth';
import { requirePermission } from '../middleware/permissions';
import path from 'path';
import fs from 'fs';

const router = express.Router();


router.post('/', authenticate, requirePermission('import:run'), createResearchPaper);
router.get('/', getAllResearchPapers);
// Place specific routes BEFORE dynamic routes
router.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.resolve(__dirname, '../../uploads', filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      message: 'File not found',
    });
  }

  return res.download(filePath);
});

router.get('/:id', getResearchPaperById);

export default router;
