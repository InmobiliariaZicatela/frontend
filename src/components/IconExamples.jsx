import React from "react";
import {
  Home,
  Search,
  Heart,
  Phone,
  Mail,
  MapPin,
  Star,
  ChevronRight,
  Menu,
  X,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import Icon from "./Icon";

// MOST USED ICONS

// Building, Home - Properties
// MapPin - Location
// Bed, Bath - Property features
// Phone, Mail - Contact
// Heart - Favorites
// Search - Property search
// Camera - Photos
// Calendar - Viewings

const IconExamples = () => {
  return (
    <div className="container flex-column" style={{ gap: "40px" }}>
      {/* Basic Icons */}
      <div className="flex-column" style={{ gap: "20px" }}>
        <h2 className="title h3">Basic Icons</h2>
        <div className="flex-row justify-center" style={{ gap: "20px" }}>
          <Home size={32} color="#0065f2" />
          <Search size={32} color="#28a745" />
          <Heart size={32} color="#dc3545" />
          <Star size={32} color="#ffc107" />
        </div>
      </div>

      {/* Icons with Custom Icon Component */}
      <div className="flex-column" style={{ gap: "20px" }}>
        <h2 className="title h3">Using Custom Icon Component</h2>
        <div className="flex-row justify-center" style={{ gap: "20px" }}>
          <Icon name="Home" size={32} color="#0065f2" />
          <Icon name="Search" size={32} color="#28a745" />
          <Icon name="Heart" size={32} color="#dc3545" />
          <Icon name="Star" size={32} color="#ffc107" />
        </div>
      </div>

      {/* Icons in Buttons */}
      <div className="flex-column" style={{ gap: "20px" }}>
        <h2 className="title h3">Icons in Buttons</h2>
        <div className="flex-row justify-center" style={{ gap: "16px" }}>
          <button className="btn">
            <Search size={20} style={{ marginRight: "8px" }} />
            Search
          </button>
          <button className="btn btn-outline">
            <Heart size={20} style={{ marginRight: "8px" }} />
            Favorite
          </button>
          <button className="btn btn-success">
            <Phone size={20} style={{ marginRight: "8px" }} />
            Call Now
          </button>
        </div>
      </div>

      {/* Navigation Icons */}
      <div className="flex-column" style={{ gap: "20px" }}>
        <h2 className="title h3">Navigation Icons</h2>
        <div className="flex-row justify-center" style={{ gap: "16px" }}>
          <button className="btn btn-sm">
            <Menu size={20} />
          </button>
          <button className="btn btn-sm">
            <User size={20} />
          </button>
          <button className="btn btn-sm">
            <Settings size={20} />
          </button>
          <button className="btn btn-sm btn-danger">
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Contact Information with Icons */}
      <div className="flex-column" style={{ gap: "20px" }}>
        <h2 className="title h3">Contact Information</h2>
        <div
          className="flex-column"
          style={{ gap: "12px", alignItems: "center" }}
        >
          <div className="flex-row align-center" style={{ gap: "8px" }}>
            <Phone size={20} color="#0065f2" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex-row align-center" style={{ gap: "8px" }}>
            <Mail size={20} color="#0065f2" />
            <span>info@inmobiliariazicatela.com</span>
          </div>
          <div className="flex-row align-center" style={{ gap: "8px" }}>
            <MapPin size={20} color="#0065f2" />
            <span>123 Main Street, City, State</span>
          </div>
        </div>
      </div>

      {/* Interactive Icons */}
      <div className="flex-column" style={{ gap: "20px" }}>
        <h2 className="title h3">Interactive Icons</h2>
        <div className="flex-row justify-center" style={{ gap: "20px" }}>
          <div
            className="icon-wrapper"
            onClick={() => alert("Home clicked!")}
            style={{ cursor: "pointer" }}
          >
            <Home size={32} color="#0065f2" />
          </div>
          <div
            className="icon-wrapper"
            onClick={() => alert("Search clicked!")}
            style={{ cursor: "pointer" }}
          >
            <Search size={32} color="#28a745" />
          </div>
          <div
            className="icon-wrapper"
            onClick={() => alert("Heart clicked!")}
            style={{ cursor: "pointer" }}
          >
            <Heart size={32} color="#dc3545" />
          </div>
        </div>
      </div>

      {/* Icons with Different Sizes */}
      <div className="flex-column" style={{ gap: "20px" }}>
        <h2 className="title h3">Different Sizes</h2>
        <div
          className="flex-row justify-center align-center"
          style={{ gap: "16px" }}
        >
          <Home size={16} color="#0065f2" />
          <Home size={24} color="#0065f2" />
          <Home size={32} color="#0065f2" />
          <Home size={48} color="#0065f2" />
          <Home size={64} color="#0065f2" />
        </div>
      </div>
    </div>
  );
};

export default IconExamples;
