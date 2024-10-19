

// Define a Mongoose schema and model for images
const imageSchema = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String,
    },
    description: String,
});

const Image = mongoose.model('Image', imageSchema);

// API endpoint to handle form submission
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const newImage = new Image({
            image: {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            },
            description: req.body.description,
        });

        await newImage.save();
        res.json({ message: 'Image uploaded successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading image.' });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
