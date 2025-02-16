import React, { useState, useEffect } from 'react';
import { Search, Heart, Phone, Mail } from 'lucide-react';
import { WasteItem } from '../types';

interface StoreProps {
  isArabic: boolean;
}

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

export const Store: React.FC<StoreProps> = ({ isArabic }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedItem, setSelectedItem] = useState<WasteItem | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [wastes, setWastes] = useState<WasteItem[]>([]);

  useEffect(() => {
    const fetchWastes = async () => {
      try {
        const response = await fetch('http://localhost:5000/waste');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWastes(data);
      } catch (error) {
        console.error('Error fetching wastes:', error);
      }
    };

    fetchWastes();
  }, []);

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredItems = wastes.filter(item => {
    const matchesSearch = (item.title + item.titleAr + item.description + item.descriptionAr)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || item.type === selectedType;
    const matchesLocation = !selectedLocation || item.location === selectedLocation;
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder={isArabic ? 'ابحث عن النفايات...' : 'Search waste...'}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="flex gap-4">
          <select
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">{isArabic ? 'كل الأنواع' : 'All Types'}</option>
            {wasteTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">{isArabic ? 'كل المواقع' : 'All Locations'}</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative">
              <img
                src={item.image}
                alt={isArabic ? item.titleAr : item.title}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => toggleFavorite(item.id)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
              >
                <Heart className={`w-5 h-5 ${favorites.includes(item.id) ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} />
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-emerald-900 mb-2">
                {isArabic ? item.titleAr : item.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {isArabic ? item.descriptionAr : item.description}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>{item.type}</span>
                <span>{item.quantity}</span>
                <span>{item.location}</span>
              </div>
              <button
                onClick={() => setSelectedItem(item)}
                className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors"
              >
                {isArabic ? 'عرض التفاصيل' : 'View Details'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-h-[90vh] overflow-y-auto w-full max-w-3xl">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-emerald-900">
                {isArabic ? selectedItem.titleAr : selectedItem.title}
              </h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <img
                src={selectedItem.image}
                alt={isArabic ? selectedItem.titleAr : selectedItem.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    {isArabic ? 'تفاصيل النفايات' : 'Waste Details'}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {isArabic ? selectedItem.descriptionAr : selectedItem.description}
                  </p>
                  <div className="space-y-2">
                    <p><strong>{isArabic ? 'النوع:' : 'Type:'}</strong> {selectedItem.type}</p>
                    <p><strong>{isArabic ? 'الكمية:' : 'Quantity:'}</strong> {selectedItem.quantity}</p>
                    <p><strong>{isArabic ? 'الموقع:' : 'Location:'}</strong> {selectedItem.location}</p>
                    <p><strong>{isArabic ? 'تاريخ النشر:' : 'Posted:'}</strong> {selectedItem.createdAt}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    {isArabic ? 'تفاصيل الشركة' : 'Company Details'}
                  </h3>
                  <div className="space-y-2">
                    <p><strong>{isArabic ? 'الشركة:' : 'Company:'}</strong> {isArabic ? selectedItem.companyNameAr : selectedItem.companyName}</p>
                    <p><strong>{isArabic ? 'جهة الاتصال:' : 'Contact Person:'}</strong> {selectedItem.contactPerson}</p>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${selectedItem.email}`} className="text-emerald-600 hover:text-emerald-700">
                        {selectedItem.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${selectedItem.phone}`} className="text-emerald-600 hover:text-emerald-700">
                        {selectedItem.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
