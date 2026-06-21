export const contactInfo = {
  businessName: "Sam's Painting",
  phone: "(201) 903-2872",
  phoneHref: "tel:2019032872",
  address: {
    street: "574 Commerce St #2023",
    city: "Franklin Lakes",
    state: "NJ",
    zip: "07417",
  },
  get fullAddress() {
    return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.zip}`;
  },
  get mapsUrl() {
    return `https://www.google.com/maps?q=${encodeURIComponent(this.fullAddress)}`;
  },
  instagramUrl: "https://www.instagram.com/samspainting",
  instagramHandle: "@samspainting",
  facebookUrl: "https://www.facebook.com/profile.php?id=61591115905072",
  hours: "Open 24 hours",
  license: "NJ HIC #13VH03695800",
};

export const trustBadge = "Licensed, Bonded & Insured";

export const filloutFormId = "uDciW1RQQvus";

export const filloutPopupSize = {
  width: 520,
  height: 620,
};
