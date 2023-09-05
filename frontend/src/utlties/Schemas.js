import * as yup from "yup";

export const visaSchema = yup.object().shape({
  applicant_name: yup.string().required("name is required field").max(30),
  pass_issue: yup.date().notRequired().typeError("enter a date type").nullable().default(undefined),
  pass_expiry:yup.date().notRequired().typeError("enter a date type").nullable().defined(undefined),
  care_of: yup.string().notRequired().max(30, "length must be less tahn 30"),
  dob: yup.date().typeError("enter a date type").notRequired(),
  remitted_date: yup.date().typeError("enter a date type").required("required field"),
  country: yup.string().required("country is required field"),
  pass_number: yup
    .string()
    .required("required field")
    .min(6, "atleast 6  character")
    .max(7, "length should be less than 7 "),
  phone: yup
    .string("phone number must be decimal")
    .required("required field")
    .matches(/^[0-9]+$/, "must be only digits")
    .max(15, "length must be less than 15 ")
    .min(10, "length must be greater than 10"),
  agency: yup.string().required("agency required"),
  visa_type: yup.string().required("visa type required"),
  visa_mode: yup.string().required("visa mode required"),
  gross_amount: yup
    .number()
    .typeError("number type")
    .required("gross amount required field")
    .integer()
    .min(100),
  net_amount: yup
    .number()
    .typeError("number type")
    .required("net  amount required field")
    .integer()
    .min(100)
    .max(
      yup.ref("gross_amount"),
      "net amount should be less than or equal to gross amount"
    ),
  paid: yup
    .number()
    .typeError("number type")
    .required("paid amount required field")
    .integer()
    .min(100)
    .max(
      yup.ref("gross_amount"),
      "paid amount should be less than or equal to gross amount"
    ),
  notes: yup.string(),
});

export const appoinmentSchema = yup.object().shape({
  applicant_name: yup.string().required("name is required field").max(30),
  submission_date: yup.date().required("submission date is required field"),
  appoinment_date: yup.date().required("appoinment date is required field"),
  care_of: yup.string().max(30, "length must be less tahn 30"),
  phone: yup
    .string("phone number must be decimal")
    .required()
    .matches(/^[0-9]+$/, "must be only digits")
    .max(15, "length must be less than 15 ")
    .min(10, "length must be greater than 10"),
  appoinment_time: yup.string().required(),
  pass_seva_username: yup
    .string()
    .max(15, "atmost 15 characterd")
    .min(4, "at least 4 character"),
  pass_seva_password: yup
    .string()
    .max(15, "maximum 15 characters only")
    .min(4, "minimum 4 characters"),
  office: yup.string(),
  appoinment_type: yup.string().required(),
  gross_amount: yup
    .number()
    .required("gross amount required field")
    .integer()
    .typeError("number type")
    .min(100),
  net_amount: yup
    .number()
    .required("net  amount required field")
    .integer()
    .min(100)
    .typeError("number type")
    .max(
      yup.ref("gross_amount"),
      "net amount should be less than or equal to gross amount"
    ),
  paid: yup
    .number()
    .required("paid amount required field")
    .integer()
    .min(100)
    .typeError("number type")
    .max(
      yup.ref("gross_amount"),
      "paid amount should be less than or equal to gross amount"
    ),
  notes: yup.string(),
});

export const ticketShcema = yup.object().shape({
  number_of_travelers: yup
    .number()
    .default(1)
    .min(1, "atleast one passaanger")
    .max(9, "atmost 9 passanger"),
  phone: yup
    .string("phone number must be decimal")
    .matches(/^[0-9]+$/, "must be only digits")
    .max(15, "length must be less than 15 ")
    .min(10, "length must be greater than 10"),
  pax_name: yup.string().required("name is required field").max(30,"atmost 30 charcters only"),
  care_of: yup.string().max(30, "length must be less tahn 30"),
  booked_on: yup
    .date()
    .required(" is required field")
    .typeError("enter a date"),
  depature_date: yup
    .date()
    .required(" is required field")
    .typeError("enter a date"),
  pnr: yup.string().notRequired().max(15).min(5, "pnr should contain 5 character"),
  depature_time: yup.string().required(" is required field"),
  depature_port:yup.string().required(" is required field"),
  arrival_port:yup.string().required(" is required field").notOneOf([yup.ref('depature_port'),null],"ports should diffrent"),
  airline:yup.string().notRequired(true),
  agency: yup.string().required("agency required"),
  gross_amount: yup
  .number()
  .required("gross amount required field")
  .integer()
  .typeError("number type")
  .min(100),
net_amount: yup
  .number()
  .required("net  amount required field")
  .integer()
  .min(100)
  .typeError("number type")
  .max(
    yup.ref("gross_amount"),
    "net amount should be less than or equal to gross amount"
  ),
paid: yup
  .number()
  .required("paid amount required field")
  .integer()
  .min(100)
  .typeError("number type")
  .max(
    yup.ref("gross_amount"),
    "paid amount should be less than or equal to gross amount"
  ),


  
});


export const transactionSchema=yup.object().shape({
  transaction_date: yup
    .date()
    .required(" is required field")
    .typeError("enter a date"),
    debit_or_credit:yup.boolean().required("required field"),
    transaction_method:yup.string().nullable().notRequired(),
    bill_no:yup.string().nullable().notRequired().max(30,"atmost 30 characteronly"),
    gross_amount: yup
    .number()
    .integer().notRequired().nullable()
    .typeError("number type")
    .min(yup.ref('net_amount'),"should be greater than net amount"),
  net_amount: yup
    .number()
    .required("net  amount required field")
    .integer()
    .min(100)
    .typeError("number type")
    ,  agency: yup.string().required("agency required"),
    title:yup.string().required(), 

})
export const agencySchema=yup.object().shape({

    name:yup.string().typeError("enter a agency name").required("requred field").min(3,"minimum three character").max(30,"atmost 30"),
    branch:yup.string().typeError("enter a branch name").required("requred field").min(3,"minimum three character").max(30,"atmost 30"),
    short_name:yup.string().notRequired().typeError("enter a short  name").min(3,"minimum three character").max(5,"atmost 5").optional()

  })

  export   const attastationSchema=yup.object().shape({
    applicant_name:yup.string().required("name is required field").max(30),
    pass_number:yup
    .string()
    
    .min(6, "atleast 6  character")
    .max(7, "length should be less than 7 "),
    phone: yup
    .string("phone number must be decimal")
    .required("required field")
    .matches(/^[0-9]+$/, "must be only digits")
    .max(15, "length must be less than 15 ")
    .min(10, "length must be greater than 10"),
    care_of:yup.string().max(30, "length must be less tahn 30"),
    agency: yup.string().required("agency required"),
    remitted_date:yup.date().required("required field").typeError("should be date format"),
    dob:yup.date().notRequired().nullable(),
    country:yup.string().required("country is required field"),
    gross_amount: yup
    .number()
    .required("gross amount required field")
    .integer()
    .typeError("number type")
    .min(100),
  net_amount: yup
    .number()
    .required("net  amount required field")
    .integer()
    .min(100)
    .typeError("number type")
    .max(
      yup.ref("gross_amount"),
      "net amount should be less than or equal to gross amount"
    ),
  paid: yup
    .number()
    .required("paid amount required field")
    .integer()
    .min(100)
    .typeError("number type")
    .max(
      yup.ref("gross_amount"),
      "paid amount should be less than or equal to gross amount"
    ),
  })
  export const annexSchema=yup.object().shape({
    
  })


  export const tickerRequestSchema=yup.object().shape({

    applicant_name:yup.string().required("name is required field").max(30),
  depature_port:yup.string().required(" is required field").notOneOf([yup.ref('arrival_port'),null],"ports should diffrent"),
    arrival_port:yup.string().required(" is required field"),
    from_date:yup
    .date()
    .required(" is required field")
    .typeError("enter a date"),
    to_date:yup
    .date()
    .required(" is required field")
    .typeError("enter a date"),
    phone: yup
    .string("phone number must be decimal")
    .required("required field")
    .matches(/^[0-9]+$/, "must be only digits")
    .max(15, "length must be less than 15 ")
    .min(10, "length must be greater than 10"),
    seats:yup
    .number()
    .default(1)
    .min(1, "atleast one passaanger")
    .max(9, "atmost 9 passanger"),
  
    pass_number: yup
    .string()
    .min(6, "atleast 6  character")
    .max(7, "length should be less than 7 "),

  })

  export const updateProfileSchema=yup.object().shape({
   
    agency_name: yup.string().required().max(35),
    branch: yup.string().required().max(35),
    pincode:yup.string().nullable().notRequired().min(5).max(7)
  })
  export const sellTicketSchema=yup.object().shape({
    depature_port:yup.string().required("name is required field"),
    arrival_port:yup.string().required(" is required field").notOneOf([yup.ref('depature_port'),null],"ports should diffrent"),
    date:yup
    .date()
    .required(" is required field")
    .typeError("enter a date"),
    depature_time: yup.string().required(),
    arrival_time: yup.string().required(),
    airline:yup.string().required("agency required"),
    amount: yup
    .number()
    .typeError("number type")
    .required("paid amount required field")
    .integer()
    .min(100),
    seats:yup
    .number()
    .default(1)
    .min(1, "atleast one passaanger")
    .max(50, "atmost 9 passanger"),
    mail:yup.string().notRequired().email("must be a valid e mail"),
    phone: yup
    .string("phone number must be decimal")
    .required("required field")
    .matches(/^[0-9]+$/, "must be only digits")
    .max(15, "length must be less than 15 ")
    .min(10, "length must be greater than 10"),
    flight_number:yup.string().notRequired(),
  })