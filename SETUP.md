# Setup Guide - VMSS Technologies Website with Image Upload

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/vmss
JWT_SECRET=your-secret-key-change-in-production
PORT=5000
```

4. Seed initial data (creates admin user):
```bash
npm run seed
```

**Default Admin Credentials:**
- Email: `admin@vmss.com`
- Password: `admin123`

⚠️ **Important:** Change the admin password after first login!

5. Start the backend server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

## Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Image Upload Features

### Admin Panel

1. **Access Admin Panel:**
   - Click "Login" button in the header
   - Login with admin credentials

2. **Upload Images:**
   - Go to "Courses" or "Instructors" tab
   - Click "Add Course" or "Add Instructor"
   - Click on "Image" file input to select an image from your device
   - Image will be uploaded automatically when you save
   - Images are stored in `backend/uploads/` directory

3. **View Images:**
   - Images appear as thumbnails in the admin tables
   - Course images: 16x16 thumbnails
   - Instructor images: 16x16 circular thumbnails

### Image Specifications

- **Supported formats:** JPEG, JPG, PNG, GIF, WEBP
- **Maximum file size:** 5MB
- **Storage location:** `backend/uploads/`
- **Image URLs:** Images are served from `http://localhost:5000/uploads/`

## API Endpoints

### Image Upload
- `POST /api/upload/image` - Upload single image
- `POST /api/upload/images` - Upload multiple images
- `DELETE /api/upload/image/:filename` - Delete image

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course (Admin only)
- `PUT /api/courses/:id` - Update course (Admin only)
- `DELETE /api/courses/:id` - Delete course (Admin only)

### Instructors
- `GET /api/instructors` - Get all instructors
- `POST /api/instructors` - Create instructor (Admin only)
- `PUT /api/instructors/:id` - Update instructor (Admin only)
- `DELETE /api/instructors/:id` - Delete instructor (Admin only)

### Contacts
- `GET /api/contacts` - Get all contacts (Admin only)
- `POST /api/contacts` - Submit contact form (Public)
- `PUT /api/contacts/:id` - Update contact status (Admin only)
- `DELETE /api/contacts/:id` - Delete contact (Admin only)

## Project Structure

```
.
├── backend/
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   ├── uploads/         # Uploaded images (created automatically)
│   ├── scripts/         # Seed data script
│   └── server.js        # Express server
├── src/
│   ├── components/
│   │   ├── admin/       # Admin panel components
│   │   └── ...          # Main website components
│   ├── pages/           # Page components (Admin)
│   ├── config/          # Configuration files
│   └── App.jsx          # Main app component
└── ...
```

## Troubleshooting

1. **Images not displaying:**
   - Ensure backend server is running
   - Check that images are in `backend/uploads/` directory
   - Verify image URLs in database

2. **Upload fails:**
   - Check file size (max 5MB)
   - Verify file format (JPEG, PNG, GIF, WEBP)
   - Check backend server logs

3. **Admin login not working:**
   - Run `npm run seed` in backend directory
   - Check MongoDB connection

4. **CORS errors:**
   - Ensure backend CORS is configured correctly
   - Check API_URL in `src/config/backend.js`

## Notes

- Images are stored locally in `backend/uploads/` directory
- For production, consider using cloud storage (AWS S3, Cloudinary, etc.)
- Admin panel requires authentication
- All image uploads require admin authentication token

