export const contactInfo = {
  businessName: "Sam's Painting LLC",
  phone: "(201) 232-5978",
  phoneHref: "tel:2012325978",
  email: "sam@samthepainter.com",
  address: {
    street: "637 Wyckoff Ave",
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
  hicNumber: "13VH03695800",
  license: "NJ HIC #13VH03695800",
};

export const trustBadge = `Licensed, Bonded & Insured · HIC #${contactInfo.hicNumber}`;

export const filloutFormId = "uDciW1RQQvus";

export const filloutPopupSize = {
  width: 520,
  height: 620,
};
