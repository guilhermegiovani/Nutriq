import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json(
        {
            "id": "1",
            "type": "breakfast"
        }
    );
});

export default router;