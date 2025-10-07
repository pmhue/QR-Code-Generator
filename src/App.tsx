import React, { useState, useRef } from 'react';
import { Download, Globe, Palette, Settings, BarChart3 } from 'lucide-react';
import QRCode from 'qrcode';

// Types
type QRType = 'url' | 'phone' | 'maps' | 'vcard' | 'wifi';
type Language = 'vi' | 'en';

interface QRData {
  type: QRType;
  content: string;
  mapsData?: {
    url: string;
    title: string;
    note: string;
  };
  vcardData?: {
    name: string;
    jobTitle: string;
    phone: string;
    email: string;
    organization: string;
  };
  wifiData?: {
    ssid: string;
    password: string;
    encryption: string;
  };
}

interface QRStyle {
  fgColor: string;
  bgColor: string;
  logoSize: number;
  borderStyle: 'none' | 'solid' | 'dashed' | 'gradient';
  borderColor: string;
}

interface Analytics {
  totalGenerated: number;
  byType: Record<QRType, number>;
  byDate: Record<string, number>;
}

// Translations
const translations = {
  vi: {
    home: 'Trang chủ',
    title: 'QR Code Generator',
    subtitle: 'Tạo mã QR tùy chỉnh với nhiều tính năng chuyên nghiệp',
    qrInfo: 'Thông tin mã QR',
    qrType: 'Loại mã QR',
    website: 'Website / URL',
    phoneNumber: 'Số điện thoại',
    location: 'Vị trí Google Maps',
    businessCard: 'Danh thiếp VCard',
    wifiConfig: 'Cấu hình WiFi',
    enterUrl: 'Nhập đường dẫn website',
    enterPhone: 'Nhập số điện thoại',
    mapsTitle: 'Tiêu đề',
    enterLocation: 'Link Google Maps',
    mapsNote: 'Ghi chú',
    customization: 'Tùy chỉnh giao diện',
    foregroundColor: 'Màu mã QR',
    backgroundColor: 'Màu nền',
    fileName: 'Tên file',
    fileNamePlaceholder: 'Nhập tên file',
    decoration: 'Trang trí',
    borderStyle: 'Kiểu viền',
    borderColor: 'Màu viền',
    none: 'Không',
    solid: 'Liền',
    dashed: 'Đứt',
    gradient: 'Gradient',
    uploadLogo: 'Tải logo lên',
    logoSize: 'Kích thước logo',
    generateQR: 'Tạo mã QR',
    downloadPNG: 'Tải PNG',
    downloadSVG: 'Tải SVG',
    preview: 'Xem trước',
    analytics: 'Thống kê',
    totalGenerated: 'Tổng số mã đã tạo',
    byType: 'Theo loại',
    name: 'Họ tên',
    jobTitle: 'Chức danh',
    email: 'Email',
    organization: 'Công ty',
    ssid: 'Tên WiFi (SSID)',
    password: 'Mật khẩu',
    encryption: 'Mã hóa',
    createdBy: 'Được tạo bởi',
    internalUse: 'Chỉ sử dụng nội bộ Cty HLHV',
    allRightsReserved: 'All rights reserved',
  },
  en: {
    home: 'Home',
    title: 'QR Code Generator',
    subtitle: 'Create customized QR codes with professional features',
    qrInfo: 'QR Code Information',
    qrType: 'QR Code Type',
    website: 'Website / URL',
    phoneNumber: 'Phone Number',
    location: 'Google Maps Location',
    businessCard: 'Business Card VCard',
    wifiConfig: 'WiFi Configuration',
    enterUrl: 'Enter website URL',
    enterPhone: 'Enter phone number',
    mapsTitle: 'Title',
    enterLocation: 'Google Maps link',
    mapsNote: 'Note',
    customization: 'Appearance Customization',
    foregroundColor: 'QR Code Color',
    backgroundColor: 'Background Color',
    fileName: 'File Name',
    fileNamePlaceholder: 'Enter file name',
    decoration: 'Decoration',
    borderStyle: 'Border Style',
    borderColor: 'Border Color',
    none: 'None',
    solid: 'Solid',
    dashed: 'Dashed',
    gradient: 'Gradient',
    uploadLogo: 'Upload Logo',
    logoSize: 'Logo Size',
    generateQR: 'Generate QR Code',
    downloadPNG: 'Download PNG',
    downloadSVG: 'Download SVG',
    preview: 'Preview',
    analytics: 'Analytics',
    totalGenerated: 'Total Generated',
    byType: 'By Type',
    name: 'Full Name',
    jobTitle: 'Job Title',
    email: 'Email',
    organization: 'Organization',
    ssid: 'WiFi Name (SSID)',
    password: 'Password',
    encryption: 'Encryption',
    createdBy: 'Created by',
    internalUse: 'For internal use of HLHV Company only',
    allRightsReserved: 'All rights reserved',
  },
};

const QRCodeGenerator: React.FC = () => {
  const [lang, setLang] = useState<Language>('vi');
  const [qrData, setQRData] = useState<QRData>({
    type: 'url',
    content: '',
    mapsData: {
      url: '',
      title: '',
      note: '',
    },
    vcardData: {
      name: '',
      jobTitle: '',
      phone: '',
      email: '',
      organization: '',
    },
    wifiData: {
      ssid: '',
      password: '',
      encryption: 'WPA',
    },
  });
  const [qrStyle, setQRStyle] = useState<QRStyle>({
    fgColor: '#000000',
    bgColor: '#FFFFFF',
    logoSize: 20,
    borderStyle: 'solid',
    borderColor: '#3B82F6',
  });
  const [logo, setLogo] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('qrcode');
  const [qrGenerated, setQrGenerated] = useState(false);
  const [analytics, setAnalytics] = useState<Analytics>({
    totalGenerated: 0,
    byType: { url: 0, phone: 0, maps: 0, vcard: 0, wifi: 0 },
    byDate: {},
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const t = translations[lang];

  // Reset to home/refresh
  const handleHomeClick = () => {
    // Reset all states to initial values
    setQRData({
      type: 'url',
      content: '',
      mapsData: {
        url: '',
        title: '',
        note: '',
      },
      vcardData: {
        name: '',
        jobTitle: '',
        phone: '',
        email: '',
        organization: '',
      },
      wifiData: {
        ssid: '',
        password: '',
        encryption: 'WPA',
      },
    });
    setQRStyle({
      fgColor: '#000000',
      bgColor: '#FFFFFF',
      logoSize: 20,
      borderStyle: 'solid',
      borderColor: '#3B82F6',
    });
    setLogo(null);
    setFileName('qrcode');
    setQrGenerated(false);
    
    // Clear canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate QR code
  const generateQRCode = async () => {
    let dataToEncode = '';
    
    switch (qrData.type) {
      case 'url':
        if (!qrData.content) return;
        dataToEncode = qrData.content.startsWith('http') ? qrData.content : `https://${qrData.content}`;
        break;
      case 'phone':
        if (!qrData.content) return;
        dataToEncode = `tel:${qrData.content}`;
        break;
      case 'maps':
        if (!qrData.mapsData?.url) return;
        // Create landing page URL with query parameters
        const baseUrl = window.location.origin;
        const params = new URLSearchParams();
        params.append('url', qrData.mapsData.url);
        params.append('lang', lang); // Add language parameter
        if (qrData.mapsData.title) {
          params.append('title', qrData.mapsData.title);
        }
        if (qrData.mapsData.note) {
          params.append('note', qrData.mapsData.note);
        }
        dataToEncode = `${baseUrl}/map-landing.html?${params.toString()}`;
        break;
      case 'vcard':
        if (!qrData.vcardData?.name) return;
        // VCard 3.0 International Standard (RFC 2426)
        // Ensures maximum compatibility across all devices
        dataToEncode = `BEGIN:VCARD\nVERSION:3.0\nFN:${qrData.vcardData.name}\nTITLE:${qrData.vcardData.jobTitle}\nTEL:${qrData.vcardData.phone}\nEMAIL:${qrData.vcardData.email}\nORG:${qrData.vcardData.organization}\nEND:VCARD`;
        break;
      case 'wifi':
        if (!qrData.wifiData?.ssid) return;
        dataToEncode = `WIFI:T:${qrData.wifiData.encryption};S:${qrData.wifiData.ssid};P:${qrData.wifiData.password};;`;
        break;
    }

    if (!dataToEncode) return;

    const canvas = canvasRef.current;
    if (canvas) {
      try {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size with padding for decorations
        const padding = 40;
        canvas.width = 400 + padding * 2;
        canvas.height = 400 + padding * 2;

        // Fill background
        ctx.fillStyle = qrStyle.bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Generate standard QR code (all styles are scannable)
        const qrCanvas = document.createElement('canvas');
        
        // All styles use standard QR code for maximum scannability
        // The "style" option is for visual preference only
        await QRCode.toCanvas(qrCanvas, dataToEncode, {
          width: 400,
          margin: 2,
          color: {
            dark: qrStyle.fgColor,
            light: qrStyle.bgColor,
          },
          errorCorrectionLevel: 'H', // High error correction
        });

        // Draw QR code centered (same for all styles to ensure scannability)
        ctx.drawImage(qrCanvas, padding, padding);

        // Draw border
        if (qrStyle.borderStyle !== 'none') {
          ctx.save();
          const borderWidth = 8;
          const borderRadius = 15;

          if (qrStyle.borderStyle === 'gradient') {
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#3B82F6');
            gradient.addColorStop(0.5, '#8B5CF6');
            gradient.addColorStop(1, '#EC4899');
            ctx.strokeStyle = gradient;
          } else {
            ctx.strokeStyle = qrStyle.borderColor;
          }

          ctx.lineWidth = borderWidth;

          if (qrStyle.borderStyle === 'dashed') {
            ctx.setLineDash([15, 10]);
          }

          // Draw rounded rectangle border
          const x = padding - borderWidth / 2;
          const y = padding - borderWidth / 2;
          const width = 400 + borderWidth;
          const height = 400 + borderWidth;

          ctx.beginPath();
          ctx.moveTo(x + borderRadius, y);
          ctx.lineTo(x + width - borderRadius, y);
          ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius);
          ctx.lineTo(x + width, y + height - borderRadius);
          ctx.quadraticCurveTo(x + width, y + height, x + width - borderRadius, y + height);
          ctx.lineTo(x + borderRadius, y + height);
          ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
          ctx.lineTo(x, y + borderRadius);
          ctx.quadraticCurveTo(x, y, x + borderRadius, y);
          ctx.closePath();
          ctx.stroke();

          ctx.restore();
        }

        // Draw logo if exists
        if (logo) {
          const logoImg = new Image();
          logoImg.onload = () => {
            const logoSizePixels = (400 * qrStyle.logoSize) / 100;
            const logoX = (canvas.width - logoSizePixels) / 2;
            const logoY = (canvas.height - logoSizePixels) / 2;
            
            // White background for logo with shadow
            ctx.save();
            ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
            ctx.shadowBlur = 10;
            ctx.fillStyle = qrStyle.bgColor;
            ctx.fillRect(logoX - 8, logoY - 8, logoSizePixels + 16, logoSizePixels + 16);
            ctx.restore();
            
            ctx.drawImage(logoImg, logoX, logoY, logoSizePixels, logoSizePixels);
          };
          logoImg.src = logo;
        }

        // Update analytics
        const today = new Date().toISOString().split('T')[0];
        setAnalytics(prev => ({
          totalGenerated: prev.totalGenerated + 1,
          byType: {
            ...prev.byType,
            [qrData.type]: prev.byType[qrData.type] + 1,
          },
          byDate: {
            ...prev.byDate,
            [today]: (prev.byDate[today] || 0) + 1,
          },
        }));

        setQrGenerated(true);
      } catch (error) {
        console.error('Error generating QR code:', error);
        alert('Có lỗi khi tạo mã QR. Vui lòng thử lại!');
      }
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadQR = (format: 'png' | 'svg') => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Clean filename (remove special characters)
    const cleanFileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'qrcode';

    if (format === 'png') {
      const link = document.createElement('a');
      link.download = `${cleanFileName}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } else {
      const link = document.createElement('a');
      link.download = `${cleanFileName}.svg`;
      
      // Create SVG from canvas
      const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
        <image href="${canvas.toDataURL()}" width="${canvas.width}" height="${canvas.height}"/>
      </svg>`;
      
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      link.href = URL.createObjectURL(blob);
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header with Navigation */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              {/* Logo & Brand */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  QR Code Generator
                </span>
              </div>
              
              {/* Navigation Menu */}
              <nav className="hidden md:flex items-center space-x-6">
                <button 
                  onClick={handleHomeClick}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  {t.home}
                </button>
              </nav>
            </div>
            
            {/* Language Switcher */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 font-medium hidden sm:block">Languages:</span>
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setLang('vi')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    lang === 'vi'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Việt
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    lang === 'en'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {t.title}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t.subtitle}
        </p>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Configuration */}
          <div className="space-y-6">
            {/* QR Type Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="w-6 h-6 text-blue-600" />
                {t.qrInfo}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.qrType}
                  </label>
                  <select
                    value={qrData.type}
                    onChange={(e) => setQRData({ ...qrData, type: e.target.value as QRType })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="url">{t.website}</option>
                    <option value="phone">{t.phoneNumber}</option>
                    <option value="maps">{t.location}</option>
                    <option value="vcard">{t.businessCard}</option>
                    <option value="wifi">{t.wifiConfig}</option>
                  </select>
                </div>

                {qrData.type === 'url' && (
                  <input
                    type="text"
                    value={qrData.content}
                    onChange={(e) => setQRData({ ...qrData, content: e.target.value })}
                    placeholder={t.enterUrl}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                )}

                {qrData.type === 'phone' && (
                  <input
                    type="tel"
                    value={qrData.content}
                    onChange={(e) => setQRData({ ...qrData, content: e.target.value })}
                    placeholder={t.enterPhone}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                )}

                {qrData.type === 'maps' && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={qrData.mapsData?.title || ''}
                      onChange={(e) => setQRData({
                        ...qrData,
                        mapsData: { ...qrData.mapsData!, title: e.target.value }
                      })}
                      placeholder={t.mapsTitle}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={qrData.mapsData?.url || ''}
                      onChange={(e) => setQRData({
                        ...qrData,
                        mapsData: { ...qrData.mapsData!, url: e.target.value }
                      })}
                      placeholder={t.enterLocation}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      value={qrData.mapsData?.note || ''}
                      onChange={(e) => setQRData({
                        ...qrData,
                        mapsData: { ...qrData.mapsData!, note: e.target.value }
                      })}
                      placeholder={t.mapsNote}
                      rows={2}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                )}

                {qrData.type === 'vcard' && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder={t.name}
                      value={qrData.vcardData?.name || ''}
                      onChange={(e) => setQRData({
                        ...qrData,
                        vcardData: { ...qrData.vcardData!, name: e.target.value }
                      })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder={t.jobTitle}
                      value={qrData.vcardData?.jobTitle || ''}
                      onChange={(e) => setQRData({
                        ...qrData,
                        vcardData: { ...qrData.vcardData!, jobTitle: e.target.value }
                      })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="tel"
                      placeholder={t.phoneNumber}
                      value={qrData.vcardData?.phone || ''}
                      onChange={(e) => setQRData({
                        ...qrData,
                        vcardData: { ...qrData.vcardData!, phone: e.target.value }
                      })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      placeholder={t.email}
                      value={qrData.vcardData?.email || ''}
                      onChange={(e) => setQRData({
                        ...qrData,
                        vcardData: { ...qrData.vcardData!, email: e.target.value }
                      })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder={t.organization}
                      value={qrData.vcardData?.organization || ''}
                      onChange={(e) => setQRData({
                        ...qrData,
                        vcardData: { ...qrData.vcardData!, organization: e.target.value }
                      })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}

                {qrData.type === 'wifi' && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder={t.ssid}
                      value={qrData.wifiData?.ssid || ''}
                      onChange={(e) => setQRData({
                        ...qrData,
                        wifiData: { ...qrData.wifiData!, ssid: e.target.value }
                      })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder={t.password}
                      value={qrData.wifiData?.password || ''}
                      onChange={(e) => setQRData({
                        ...qrData,
                        wifiData: { ...qrData.wifiData!, password: e.target.value }
                      })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      value={qrData.wifiData?.encryption || 'WPA'}
                      onChange={(e) => setQRData({
                        ...qrData,
                        wifiData: { ...qrData.wifiData!, encryption: e.target.value }
                      })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="WPA">WPA/WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">No Password</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Style Customization */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Palette className="w-6 h-6 text-purple-600" />
                {t.customization}
              </h2>
              
              <div className="space-y-4">
                {/* File Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.fileName}
                  </label>
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder={t.fileNamePlaceholder}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Colors - All in one row */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.foregroundColor}
                    </label>
                    <input
                      type="color"
                      value={qrStyle.fgColor}
                      onChange={(e) => setQRStyle({ ...qrStyle, fgColor: e.target.value })}
                      className="w-full h-12 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.backgroundColor}
                    </label>
                    <input
                      type="color"
                      value={qrStyle.bgColor}
                      onChange={(e) => setQRStyle({ ...qrStyle, bgColor: e.target.value })}
                      className="w-full h-12 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.borderColor}
                    </label>
                    <input
                      type="color"
                      value={qrStyle.borderColor}
                      onChange={(e) => setQRStyle({ ...qrStyle, borderColor: e.target.value })}
                      className="w-full h-12 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Decoration Section */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-purple-600" />
                    {t.decoration}
                  </h3>

                  {/* Border Style */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.borderStyle}
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['none', 'solid', 'dashed', 'gradient'] as const).map((style) => (
                        <button
                          key={style}
                          onClick={() => setQRStyle({ ...qrStyle, borderStyle: style })}
                          className={`px-2 py-2 rounded-lg border-2 transition-all text-xs font-medium ${
                            qrStyle.borderStyle === style
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {t[style]}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Logo Upload */}
                <div className="pt-4 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.uploadLogo}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {logo && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.logoSize}: {qrStyle.logoSize}%
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="30"
                      value={qrStyle.logoSize}
                      onChange={(e) => setQRStyle({ ...qrStyle, logoSize: Number(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={generateQRCode}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] shadow-lg"
            >
              {t.generateQR}
            </button>
          </div>

          {/* Right Column - Preview & Analytics */}
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.preview}</h2>
              <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 min-h-[520px]">
                <canvas
                  ref={canvasRef}
                  width={480}
                  height={480}
                  className="max-w-full h-auto rounded-lg shadow-xl"
                />
              </div>
              
              {qrGenerated && (
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button
                    onClick={() => downloadQR('png')}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    {t.downloadPNG}
                  </button>
                  <button
                    onClick={() => downloadQR('svg')}
                    className="px-4 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    {t.downloadSVG}
                  </button>
                </div>
              )}
            </div>

            {/* Analytics Dashboard */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-green-600" />
                {t.analytics}
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">{t.totalGenerated}</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics.totalGenerated}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">{t.byType}</h3>
                  <div className="space-y-2">
                    {Object.entries(analytics.byType).map(([type, count]) => (
                      <div key={type} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 capitalize">{type}</span>
                        <span className="text-sm font-semibold text-gray-900">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-2">
            <p className="text-gray-700 font-medium">
              {t.createdBy} <span className="text-blue-600 font-bold">Cty HLHV</span>
            </p>
            <p className="text-sm text-gray-500">
              {t.internalUse}
            </p>
            <div className="pt-4 border-t border-gray-100 mt-4">
              <p className="text-xs text-gray-400">
                © {new Date().getFullYear()} HLHV Company. {t.allRightsReserved}.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QRCodeGenerator;
