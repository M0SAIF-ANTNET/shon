import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

const wasteTypes = [
  "Plastic", "Metal", "Textile", "Paper", "Glass",
  "Chemical", "Wood", "Electronic", "Construction", "Agricultural"
];

const locations = [
  "Cairo", "Alexandria", "Giza", "Port Said", "Suez",
  "Aswan", "6th of October", "Mansoura", "El-Mahalla", "Tanta", "10th of Ramadan"
];

const UploadForm = ({ isArabic }: { isArabic: boolean }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    titleAr: "",
    description: "",
    descriptionAr: "",
    type: "",
    quantity: "",
    location: "",
    companyName: "",
    companyNameAr: "",
    contactPerson: "",
    email: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setPreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));

      if (preview) {
        const response = await fetch(preview);
        const blob = await response.blob();
        data.append("image", blob, "image.png");
      }

      const response = await fetch("http://localhost:5000/waste", {
        method: "POST",
        body: data,
      });

      if (!response.ok) throw new Error("Failed to submit waste data");

      alert(isArabic ? "تمت إضافة النفايات بنجاح!" : "Waste added successfully!");

      
      setFormData({
        title: "", titleAr: "", description: "", descriptionAr: "", type: "",
        quantity: "", location: "", companyName: "", companyNameAr: "",
        contactPerson: "", email: "", phone: "",
      });
      setPreview(null);
    } catch (error) {
      setError(isArabic ? "حدث خطأ أثناء الإرسال!" : "An error occurred while submitting!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full max-w-2xl mx-auto p-6 ${isArabic ? "rtl" : "ltr"}`}>
      <h2 className="text-2xl font-bold mb-6 text-emerald-800">
        {isArabic ? "إضافة نفايات للتبادل" : "Add Waste for Exchange"}
      </h2>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload */}
        <div {...getRootProps()} className="border-2 border-dashed border-emerald-300 rounded-lg p-8 text-center cursor-pointer hover:border-emerald-500 transition">
          <input {...getInputProps()} />
          {preview ? (
            <img src={preview} alt="Preview" className="max-h-48 mx-auto" />
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-12 h-12 text-emerald-500 mb-2" />
              <p>{isArabic ? "اسحب الصورة هنا أو انقر للاختيار" : "Drag and drop image here or click to select"}</p>
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder={isArabic ? "العنوان" : "Title"} className="input" />
          <input type="text" name="titleAr" value={formData.titleAr} onChange={handleChange} placeholder={isArabic ? "العنوان بالعربية" : "Title (Arabic)"} className="input" />
        </div>

        <textarea name="description" value={formData.description} onChange={handleChange} placeholder={isArabic ? "الوصف" : "Description"} className="input"></textarea>

        <select name="type" value={formData.type} onChange={handleChange} className="input">
          <option value="">{isArabic ? "اختر النوع" : "Select Type"}</option>
          {wasteTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} placeholder={isArabic ? "الكمية" : "Quantity"} className="input" />

        <select name="location" value={formData.location} onChange={handleChange} className="input">
          <option value="">{isArabic ? "اختر الموقع" : "Select Location"}</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder={isArabic ? "اسم الشركة" : "Company Name"} className="input" />
          <input type="text" name="companyNameAr" value={formData.companyNameAr} onChange={handleChange} placeholder={isArabic ? "اسم الشركة بالعربية" : "Company Name (Arabic)"} className="input" />
        </div>

        <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} placeholder={isArabic ? "الشخص المسؤول" : "Contact Person"} className="input" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="input" />
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={isArabic ? "رقم الهاتف" : "Phone"} className="input" />

        <button type="submit" className="btn bg-emerald-500 text-white w-full" disabled={isSubmitting}>
          {isSubmitting ? (isArabic ? "جارٍ الإرسال..." : "Submitting...") : (isArabic ? "إرسال" : "Submit")}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
