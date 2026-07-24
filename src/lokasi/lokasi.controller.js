const express = require("express");
const router = express.Router();
const {
    createLokasi,
    getAllLokasi,
    setLokasiAktif,
    updateLokasi,
    deleteLokasi,
} = require("./lokasi.repository");

// GET semua lokasi
router.get("/", async (req, res) => {
    try {
        const daftarLokasi = await getAllLokasi();

        res.status(200).json({
            message: "data lokasi berhasil diambil",
            data: daftarLokasi,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST lokasi baru
router.post("/", async (req, res) => {
    try {
        const { nama, latitude, longtitude, radius } = req.body;
        const lokasiBaru = await createLokasi({ nama, latitude, longtitude, radius });

        res.status(200).json({
            message: "data lokasi berhasil dibuat",
            data: lokasiBaru,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT edit lokasi
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, latitude, longtitude, radius } = req.body;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "id lokasi tidak valid" });
        }

        const lokasiTerupdate = await updateLokasi(id, { nama, latitude, longtitude, radius });

        res.status(200).json({
            message: "lokasi berhasil diperbarui",
            data: lokasiTerupdate,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE lokasi
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "id lokasi tidak valid" });
        }

        await deleteLokasi(id);

        res.status(200).json({
            message: "lokasi berhasil dihapus",
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PATCH set lokasi aktif
router.patch("/:id/aktif", async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "id lokasi tidak valid" });
        }

        await setLokasiAktif(id);

        res.status(200).json({
            message: "lokasi aktif berhasil diperbarui",
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;