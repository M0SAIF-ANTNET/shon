import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

const wasteTypes = [
  'Plastic',
  'Metal',
  'Textile',
  'Paper',
  'Glass',
  'Chemical',
  'Wood',
  'Electronic',
  'Construction',
  'Agricultural'
];

const locations = [
  'Cairo',
  'Alexandria',
  'Giza',
  'Port Said',
  'Suez',
  'Aswan',
  '6th of October',
  'Mansoura',
  'El-Mahalla',
  'Tanta',
  '10th of Ramadan'
];

const UploadForm = ({ isArabic }) => {
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    titleAr: '',
    description: '',
    descriptionAr: '',
    type: '',
    quantity: '',
    location: '',
    companyName: '',
    companyNameAr: '',
    contactPerson: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setPreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('titleAr', formData.titleAr);
      data.append('description', formData.description);
      data.append('descriptionAr', formData.descriptionAr);
      data.append('type', formData.type);
      data.append('quantity', formData.quantity);
      data.append('location', formData.location);
      data.append('companyName', formData.companyName);
      data.append('companyNameAr', formData.companyNameAr);
      data.append('contactPerson', formData.contactPerson);
      data.append('email', formData.email);
      data.append('phone', formData.phone);

      if (preview) {
        const response = await fetch(preview);
        const blob = await response.blob();
        data.append('image', blob, 'image.png');
      }

      const response = await fetch('http://localhost:5000/waste', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);
      alert(isArabic ? 'تمت إضافة النفايات بنجاح!' : 'Waste added successfully!');

      // إعادة تعيين النموذج
      setFormData({
        title: '',
        titleAr: '',
        description: '',
        descriptionAr: '',
        type: '',
        quantity: '',
        location: '',
        companyName: '',
        companyNameAr: '',
        contactPerson: '',
        email: '',
        phone: ''
      });
      setPreview(null);
    } catch (error) {
      console.error('Error:', error);
      setError(isArabic ? 'حدث خطأ أثناء إرسال النفايات!' : 'An error occurred while submitting waste!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className={`w-full max-w-2xl mx-auto p-6 ${isArabic ? 'rtl' : 'ltr'}`}>
      <h2 className="text-2xl font-bold mb-6 text-emerald-800">
        {isArabic ? 'إضافة نفايات للتبادل' : 'Add Waste for Exchange'}
      </h2>
      
      {error && <div className="mb-4 text-red-500">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div {...getRootProps()} className="border-2 border-dashed border-emerald-300 rounded-lg p-8 text-center cursor-pointer hover:border-emerald-500 transition-colors">
          <input {...getInputProps()} />
          {preview ? (
            <img src={preview} alt="Preview" className="max-h-48 mx-auto" />
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-12 h-12 text-emerald-500 mb-2" />
              <p>{isArabic ? 'اسحب الصورة هنا أو انقر للاختيار' : 'Drag and drop image here or click to select'}</p>
            </div>
          )}
        </div>

        {/* باقي الكود */}
      </form>
    </div>
  );
};

export default UploadForm;
