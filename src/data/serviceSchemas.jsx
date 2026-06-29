export const SERVICE_SCHEMAS = {
  Export_Handling : {
    title: "Export Handling",
    fields: [
      { name: "company_name", label: "Company Name", type: "text", required: true, svg: "none", accept: ""},
      { name: "company_address", label: "Company Address", type: "text", required: true, svg: "none", accept:""},
      { name: "pic_name", label: "PIC Name", type: "text", required: true, svg: "none", accept: ""},
      { name: "pic_email", label: "PIC Email", type: "email", required: true, svg: "none", accept: ""},
      { name: "pic_number", label: "PIC Number", type: "number", required: true, svg: "none", accept: ""},
      { name: "hs_code", label: "HS Code", type: "number", required: true, svg: "none", accept: ""},
    ],
    requiredFiles: [
      { name: "invoice", label: "Invoice", type: "file", required: true, svg: "plus", accept: ".pdf"},
      { name: "packing_list", label: "Packing List", type: "file", required: true, svg: "plus", accept: ".pdf"},
    ],
  },
  Import_Clearance: {
    title: "Import Clearance",
    fields: [
      { name: "company_name", label: "Company Name", type: "text", required: true, svg: "none", accept: ""},
      { name: "company_address", label: "Company Address", type: "text", required: true, svg: "none", accept: ".pdf"},
      { name: "pic_name", label: "PIC Name", type: "text", required: true, svg: "none", accept: ""},
      { name: "pic_email", label: "PIC Email", type: "email", required: true, svg: "none", accept: ""},
      { name: "pic_number", label: "PIC Number", type: "number", required: true, svg: "none", accept: ""},
      { name: "hs_code", label: "HS Code", type: "number", required: true, svg: "none", accept: ""},
    ],
    requiredFiles: [
      { name: "invoice", label: "Invoice", type: "file", required: true, svg: "plus", accept: ".pdf"},
      { name: "packing_list", label: "Packing List", type: "file", required: true, svg: "plus", accept: ".pdf"},
      { name: "bl_copy", label: "Bill of Lading", type: "file", required: true, svg: "plus", accept: ".pdf"},
      { name: "coo_copy", label: "Certificate of Origin", type: "file", required: false, svg: "plus", accept: ".pdf"},
    ],
  },
  International_FF: {
    title: "International Freight Forwarding",
    fields: [
      { name: "company_name", label: "Company Name", type: "text", required: true, svg: "none", accept: ""},
      { name: "company_address", label: "Company Address", type: "text", required: true, svg: "none", accept: ""},
      { name: "pic_name", label: "PIC Name", type: "text", required: true, svg: "none", accept: ""},
      { name: "pic_email", label: "PIC Email", type: "email", required: true, svg: "none", accept: ""},
      { name: "pic_number", label: "PIC Number", type: "number", required: true, svg: "none", accept: ""},
    ],
    requiredFiles: [
      { name: "invoice", label: "Invoice", type: "file", required: true, svg: "plus", accept: ".pdf"},
      { name: "packing_list", label: "Packing List", type: "file", required: true, svg: "plus", accept: ".pdf"},
      { name: "shipping_instruction", label: "Shipping Instruction", type: "file", required: true, svg: "plus", accept: ".pdf"},
      { name: "notification_of_goods_export", label: "Notification of Goods Export (PEB)", type: "file", required: true, svg: "plus", accept: ".pdf"},
      { name: "goods_photo", label: "Goods Photo (pdf only)", type: "file", required: true, svg: "plus", accept: ".jpg, .jpeg, .png"},
    ],
  },
  Domestic_Delivery: {
    title: "Domestic Delivery",
    fields: [
      { name: "company_name", label: "Company Name", type: "text", required: true, svg: "none", accept: "" },
      { name: "company_address", label: "Company Address", type: "text", required: true, svg: "none", accept: "" },
      { name: "pic_name", label: "PIC Name", type: "text", required: true, svg: "none", accept: "" },
      { name: "pic_email", label: "PIC Email", type: "email", required: true, svg: "none", accept: "" },
      { name: "pic_number", label: "PIC Number", type: "number", required: true, svg: "none", accept: "" },
      { name: "shipping_address", label: "Shipping Address", type: "text", required: true, svg: "none", accept: "" },
      { name: "destination_address", label: "Destination Address", type: "text", required: true, svg: "none", accept: "" },
      { name: "goods_gross_weight", label: "Total Gross Weight", type: "number", required: true, svg: "none", accept: "" },
      { name: "goods_volume", label: "Total Volume", type: "number", required: true, svg: "none", accept: "" },
      { name: "fleet_type", label: "Fleet Type", type: "select", options: ["CDD Box", "Fuso", "Wing Box"], required: true, svg: "chevron", accept: "" },
    ],
    requiredFiles: [],
  },
  Undername_Export: {
    title: "Undername Export",
    fields: [
      { name: "company_name", label: "Company Name", type: "text", required: true, svg: "none", accept: ""},
      { name: "company_address", label: "Company Address", type: "text", required: true, svg: "none", accept:""},
      { name: "pic_name", label: "PIC Name", type: "text", required: true, svg: "none", accept: ""},
      { name: "pic_email", label: "PIC Email", type: "email", required: true, svg: "none", accept: ""},
      { name: "pic_number", label: "PIC Number", type: "number", required: true, svg: "none", accept: ""},
      { name: "hs_code", label: "HS Code", type: "number", required: true, svg: "none", accept: ""},
    ],
    requiredFiles: [
      { name: "invoice", label: "Invoice", type: "file", required: true, svg: "plus", accept: ".pdf"},
      { name: "packing_list", label: "Packing List", type: "file", required: true, svg: "plus", accept: ".pdf"},
    ],
  },
  Undername_Import: {
    title: "Undername Import",
    fields: [
      { name: "company_name", label: "Company Name", type: "text", required: true, svg: "none", accept: ""},
      { name: "company_address", label: "Company Address", type: "text", required: true, svg: "none", accept: ".pdf"},
      { name: "pic_name", label: "PIC Name", type: "text", required: true, svg: "none", accept: ""},
      { name: "pic_email", label: "PIC Email", type: "email", required: true, svg: "none", accept: ""},
      { name: "pic_number", label: "PIC Number", type: "number", required: true, svg: "none", accept: ""},
      { name: "hs_code", label: "HS Code", type: "number", required: true, svg: "none", accept: ""},   
    ],
    requiredFiles: [
      { name: "invoice", label: "Invoice", type: "file", required: true, svg: "plus", accept: ".pdf"},
      { name: "packing_list", label: "Packing List", type: "file", required: true, svg: "plus", accept: ".pdf"},
      { name: "bl_copy", label: "Bill of Lading", type: "file", required: true, svg: "plus", accept: ".pdf"},
      { name: "coo_copy", label: "Certificate of Origin", type: "file", required: false, svg: "plus", accept: ".pdf"},
    ],
  },
};