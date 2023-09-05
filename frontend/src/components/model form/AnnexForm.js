import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { attastationSchema } from "../../utlties/Schemas";
const states = [
  {
    state: "Andhra Pradesh",
    districts: [
      "Anantapur",
      "Chittoor",
      "East Godavari",
      "Guntur",
      "Krishna",
      "Kurnool",
      "Nellore",
      "Prakasam",
      "Srikakulam",
      "Visakhapatnam",
      "Vizianagaram",
      "West Godavari",
      "YSR Kadapa",
    ],
  },
  {
    state: "Arunachal Pradesh",
    districts: [
      "Tawang",
      "West Kameng",
      "East Kameng",
      "Papum Pare",
      "Kurung Kumey",
      "Kra Daadi",
      "Lower Subansiri",
      "Upper Subansiri",
      "West Siang",
      "East Siang",
      "Siang",
      "Upper Siang",
      "Lower Siang",
      "Lower Dibang Valley",
      "Dibang Valley",
      "Anjaw",
      "Lohit",
      "Namsai",
      "Changlang",
      "Tirap",
      "Longding",
    ],
  },
  {
    state: "Assam",
    districts: [
      "Baksa",
      "Barpeta",
      "Biswanath",
      "Bongaigaon",
      "Cachar",
      "Charaideo",
      "Chirang",
      "Darrang",
      "Dhemaji",
      "Dhubri",
      "Dibrugarh",
      "Goalpara",
      "Golaghat",
      "Hailakandi",
      "Hojai",
      "Jorhat",
      "Kamrup Metropolitan",
      "Kamrup",
      "Karbi Anglong",
      "Karimganj",
      "Kokrajhar",
      "Lakhimpur",
      "Majuli",
      "Morigaon",
      "Nagaon",
      "Nalbari",
      "Dima Hasao",
      "Sivasagar",
      "Sonitpur",
      "South Salmara-Mankachar",
      "Tinsukia",
      "Udalguri",
      "West Karbi Anglong",
    ],
  },
  {
    state: "Bihar",
    districts: [
      "Araria",
      "Arwal",
      "Aurangabad",
      "Banka",
      "Begusarai",
      "Bhagalpur",
      "Bhojpur",
      "Buxar",
      "Darbhanga",
      "East Champaran (Motihari)",
      "Gaya",
      "Gopalganj",
      "Jamui",
      "Jehanabad",
      "Kaimur (Bhabua)",
      "Katihar",
      "Khagaria",
      "Kishanganj",
      "Lakhisarai",
      "Madhepura",
      "Madhubani",
      "Munger (Monghyr)",
      "Muzaffarpur",
      "Nalanda",
      "Nawada",
      "Patna",
      "Purnia (Purnea)",
      "Rohtas",
      "Saharsa",
      "Samastipur",
      "Saran",
      "Sheikhpura",
      "Sheohar",
      "Sitamarhi",
      "Siwan",
      "Supaul",
      "Vaishali",
      "West Champaran",
    ],
  },
  {
    state: "Chandigarh (UT)",
    districts: ["Chandigarh"],
  },
  {
    state: "Chhattisgarh",
    districts: [
      "Balod",
      "Baloda Bazar",
      "Balrampur",
      "Bastar",
      "Bemetara",
      "Bijapur",
      "Bilaspur",
      "Dantewada (South Bastar)",
      "Dhamtari",
      "Durg",
      "Gariyaband",
      "Janjgir-Champa",
      "Jashpur",
      "Kabirdham (Kawardha)",
      "Kanker (North Bastar)",
      "Kondagaon",
      "Korba",
      "Korea (Koriya)",
      "Mahasamund",
      "Mungeli",
      "Narayanpur",
      "Raigarh",
      "Raipur",
      "Rajnandgaon",
      "Sukma",
      "Surajpur  ",
      "Surguja",
    ],
  },
  {
    state: "Dadra and Nagar Haveli (UT)",
    districts: ["Dadra & Nagar Haveli"],
  },
  {
    state: "Daman and Diu (UT)",
    districts: ["Daman", "Diu"],
  },
  {
    state: "Delhi (NCT)",
    districts: [
      "Central Delhi",
      "East Delhi",
      "New Delhi",
      "North Delhi",
      "North East  Delhi",
      "North West  Delhi",
      "Shahdara",
      "South Delhi",
      "South East Delhi",
      "South West  Delhi",
      "West Delhi",
    ],
  },
  {
    state: "Goa",
    districts: ["North Goa", "South Goa"],
  },
  {
    state: "Gujarat",
    districts: [
      "Ahmedabad",
      "Amreli",
      "Anand",
      "Aravalli",
      "Banaskantha (Palanpur)",
      "Bharuch",
      "Bhavnagar",
      "Botad",
      "Chhota Udepur",
      "Dahod",
      "Dangs (Ahwa)",
      "Devbhoomi Dwarka",
      "Gandhinagar",
      "Gir Somnath",
      "Jamnagar",
      "Junagadh",
      "Kachchh",
      "Kheda (Nadiad)",
      "Mahisagar",
      "Mehsana",
      "Morbi",
      "Narmada (Rajpipla)",
      "Navsari",
      "Panchmahal (Godhra)",
      "Patan",
      "Porbandar",
      "Rajkot",
      "Sabarkantha (Himmatnagar)",
      "Surat",
      "Surendranagar",
      "Tapi (Vyara)",
      "Vadodara",
      "Valsad",
    ],
  },
  {
    state: "Haryana",
    districts: [
      "Ambala",
      "Bhiwani",
      "Charkhi Dadri",
      "Faridabad",
      "Fatehabad",
      "Gurgaon",
      "Hisar",
      "Jhajjar",
      "Jind",
      "Kaithal",
      "Karnal",
      "Kurukshetra",
      "Mahendragarh",
      "Mewat",
      "Palwal",
      "Panchkula",
      "Panipat",
      "Rewari",
      "Rohtak",
      "Sirsa",
      "Sonipat",
      "Yamunanagar",
    ],
  },
  {
    state: "Himachal Pradesh",
    districts: [
      "Bilaspur",
      "Chamba",
      "Hamirpur",
      "Kangra",
      "Kinnaur",
      "Kullu",
      "Lahaul &amp; Spiti",
      "Mandi",
      "Shimla",
      "Sirmaur (Sirmour)",
      "Solan",
      "Una",
    ],
  },
  {
    state: "Jammu and Kashmir",
    districts: [
      "Anantnag",
      "Bandipore",
      "Baramulla",
      "Budgam",
      "Doda",
      "Ganderbal",
      "Jammu",
      "Kargil",
      "Kathua",
      "Kishtwar",
      "Kulgam",
      "Kupwara",
      "Leh",
      "Poonch",
      "Pulwama",
      "Rajouri",
      "Ramban",
      "Reasi",
      "Samba",
      "Shopian",
      "Srinagar",
      "Udhampur",
    ],
  },
  {
    state: "Jharkhand",
    districts: [
      "Bokaro",
      "Chatra",
      "Deoghar",
      "Dhanbad",
      "Dumka",
      "East Singhbhum",
      "Garhwa",
      "Giridih",
      "Godda",
      "Gumla",
      "Hazaribag",
      "Jamtara",
      "Khunti",
      "Koderma",
      "Latehar",
      "Lohardaga",
      "Pakur",
      "Palamu",
      "Ramgarh",
      "Ranchi",
      "Sahibganj",
      "Seraikela-Kharsawan",
      "Simdega",
      "West Singhbhum",
    ],
  },
  {
    state: "Karnataka",
    districts: [
      "Bagalkot",
      "Ballari (Bellary)",
      "Belagavi (Belgaum)",
      "Bengaluru (Bangalore) Rural",
      "Bengaluru (Bangalore) Urban",
      "Bidar",
      "Chamarajanagar",
      "Chikballapur",
      "Chikkamagaluru (Chikmagalur)",
      "Chitradurga",
      "Dakshina Kannada",
      "Davangere",
      "Dharwad",
      "Gadag",
      "Hassan",
      "Haveri",
      "Kalaburagi (Gulbarga)",
      "Kodagu",
      "Kolar",
      "Koppal",
      "Mandya",
      "Mysuru (Mysore)",
      "Raichur",
      "Ramanagara",
      "Shivamogga (Shimoga)",
      "Tumakuru (Tumkur)",
      "Udupi",
      "Uttara Kannada (Karwar)",
      "Vijayapura (Bijapur)",
      "Yadgir",
    ],
  },
  {
    state: "Kerala",
    districts: [
      "Alappuzha",
      "Ernakulam",
      "Idukki",
      "Kannur",
      "Kasaragod",
      "Kollam",
      "Kottayam",
      "Kozhikode",
      "Malappuram",
      "Palakkad",
      "Pathanamthitta",
      "Thiruvananthapuram",
      "Thrissur",
      "Wayanad",
    ],
  },
  {
    state: "Lakshadweep (UT)",
    districts: [
      "Agatti",
      "Amini",
      "Androth",
      "Bithra",
      "Chethlath",
      "Kavaratti",
      "Kadmath",
      "Kalpeni",
      "Kilthan",
      "Minicoy",
    ],
  },
  {
    state: "Madhya Pradesh",
    districts: [
      "Agar Malwa",
      "Alirajpur",
      "Anuppur",
      "Ashoknagar",
      "Balaghat",
      "Barwani",
      "Betul",
      "Bhind",
      "Bhopal",
      "Burhanpur",
      "Chhatarpur",
      "Chhindwara",
      "Damoh",
      "Datia",
      "Dewas",
      "Dhar",
      "Dindori",
      "Guna",
      "Gwalior",
      "Harda",
      "Hoshangabad",
      "Indore",
      "Jabalpur",
      "Jhabua",
      "Katni",
      "Khandwa",
      "Khargone",
      "Mandla",
      "Mandsaur",
      "Morena",
      "Narsinghpur",
      "Neemuch",
      "Panna",
      "Raisen",
      "Rajgarh",
      "Ratlam",
      "Rewa",
      "Sagar",
      "Satna",
      "Sehore",
      "Seoni",
      "Shahdol",
      "Shajapur",
      "Sheopur",
      "Shivpuri",
      "Sidhi",
      "Singrauli",
      "Tikamgarh",
      "Ujjain",
      "Umaria",
      "Vidisha",
    ],
  },
  {
    state: "Maharashtra",
    districts: [
      "Ahmednagar",
      "Akola",
      "Amravati",
      "Aurangabad",
      "Beed",
      "Bhandara",
      "Buldhana",
      "Chandrapur",
      "Dhule",
      "Gadchiroli",
      "Gondia",
      "Hingoli",
      "Jalgaon",
      "Jalna",
      "Kolhapur",
      "Latur",
      "Mumbai City",
      "Mumbai Suburban",
      "Nagpur",
      "Nanded",
      "Nandurbar",
      "Nashik",
      "Osmanabad",
      "Palghar",
      "Parbhani",
      "Pune",
      "Raigad",
      "Ratnagiri",
      "Sangli",
      "Satara",
      "Sindhudurg",
      "Solapur",
      "Thane",
      "Wardha",
      "Washim",
      "Yavatmal",
    ],
  },
  {
    state: "Manipur",
    districts: [
      "Bishnupur",
      "Chandel",
      "Churachandpur",
      "Imphal East",
      "Imphal West",
      "Jiribam",
      "Kakching",
      "Kamjong",
      "Kangpokpi",
      "Noney",
      "Pherzawl",
      "Senapati",
      "Tamenglong",
      "Tengnoupal",
      "Thoubal",
      "Ukhrul",
    ],
  },
  {
    state: "Meghalaya",
    districts: [
      "East Garo Hills",
      "East Jaintia Hills",
      "East Khasi Hills",
      "North Garo Hills",
      "Ri Bhoi",
      "South Garo Hills",
      "South West Garo Hills ",
      "South West Khasi Hills",
      "West Garo Hills",
      "West Jaintia Hills",
      "West Khasi Hills",
    ],
  },
  {
    state: "Mizoram",
    districts: [
      "Aizawl",
      "Champhai",
      "Kolasib",
      "Lawngtlai",
      "Lunglei",
      "Mamit",
      "Saiha",
      "Serchhip",
    ],
  },
  {
    state: "Nagaland",
    districts: [
      "Dimapur",
      "Kiphire",
      "Kohima",
      "Longleng",
      "Mokokchung",
      "Mon",
      "Peren",
      "Phek",
      "Tuensang",
      "Wokha",
      "Zunheboto",
    ],
  },
  {
    state: "Odisha",
    districts: [
      "Angul",
      "Balangir",
      "Balasore",
      "Bargarh",
      "Bhadrak",
      "Boudh",
      "Cuttack",
      "Deogarh",
      "Dhenkanal",
      "Gajapati",
      "Ganjam",
      "Jagatsinghapur",
      "Jajpur",
      "Jharsuguda",
      "Kalahandi",
      "Kandhamal",
      "Kendrapara",
      "Kendujhar (Keonjhar)",
      "Khordha",
      "Koraput",
      "Malkangiri",
      "Mayurbhanj",
      "Nabarangpur",
      "Nayagarh",
      "Nuapada",
      "Puri",
      "Rayagada",
      "Sambalpur",
      "Sonepur",
      "Sundargarh",
    ],
  },
  {
    state: "Puducherry (UT)",
    districts: ["Karaikal", "Mahe", "Pondicherry", "Yanam"],
  },
  {
    state: "Punjab",
    districts: [
      "Amritsar",
      "Barnala",
      "Bathinda",
      "Faridkot",
      "Fatehgarh Sahib",
      "Fazilka",
      "Ferozepur",
      "Gurdaspur",
      "Hoshiarpur",
      "Jalandhar",
      "Kapurthala",
      "Ludhiana",
      "Mansa",
      "Moga",
      "Muktsar",
      "Nawanshahr (Shahid Bhagat Singh Nagar)",
      "Pathankot",
      "Patiala",
      "Rupnagar",
      "Sahibzada Ajit Singh Nagar (Mohali)",
      "Sangrur",
      "Tarn Taran",
    ],
  },
  {
    state: "Rajasthan",
    districts: [
      "Ajmer",
      "Alwar",
      "Banswara",
      "Baran",
      "Barmer",
      "Bharatpur",
      "Bhilwara",
      "Bikaner",
      "Bundi",
      "Chittorgarh",
      "Churu",
      "Dausa",
      "Dholpur",
      "Dungarpur",
      "Hanumangarh",
      "Jaipur",
      "Jaisalmer",
      "Jalore",
      "Jhalawar",
      "Jhunjhunu",
      "Jodhpur",
      "Karauli",
      "Kota",
      "Nagaur",
      "Pali",
      "Pratapgarh",
      "Rajsamand",
      "Sawai Madhopur",
      "Sikar",
      "Sirohi",
      "Sri Ganganagar",
      "Tonk",
      "Udaipur",
    ],
  },
  {
    state: "Sikkim",
    districts: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
  },
  {
    state: "Tamil Nadu",
    districts: [
      "Ariyalur",
      "Chennai",
      "Coimbatore",
      "Cuddalore",
      "Dharmapuri",
      "Dindigul",
      "Erode",
      "Kanchipuram",
      "Kanyakumari",
      "Karur",
      "Krishnagiri",
      "Madurai",
      "Nagapattinam",
      "Namakkal",
      "Nilgiris",
      "Perambalur",
      "Pudukkottai",
      "Ramanathapuram",
      "Salem",
      "Sivaganga",
      "Thanjavur",
      "Theni",
      "Thoothukudi (Tuticorin)",
      "Tiruchirappalli",
      "Tirunelveli",
      "Tiruppur",
      "Tiruvallur",
      "Tiruvannamalai",
      "Tiruvarur",
      "Vellore",
      "Viluppuram",
      "Virudhunagar",
    ],
  },
  {
    state: "Telangana",
    districts: [
      "Adilabad",
      "Bhadradri Kothagudem",
      "Hyderabad",
      "Jagtial",
      "Jangaon",
      "Jayashankar Bhoopalpally",
      "Jogulamba Gadwal",
      "Kamareddy",
      "Karimnagar",
      "Khammam",
      "Komaram Bheem Asifabad",
      "Mahabubabad",
      "Mahabubnagar",
      "Mancherial",
      "Medak",
      "Medchal",
      "Nagarkurnool",
      "Nalgonda",
      "Nirmal",
      "Nizamabad",
      "Peddapalli",
      "Rajanna Sircilla",
      "Rangareddy",
      "Sangareddy",
      "Siddipet",
      "Suryapet",
      "Vikarabad",
      "Wanaparthy",
      "Warangal (Rural)",
      "Warangal (Urban)",
      "Yadadri Bhuvanagiri",
    ],
  },
  {
    state: "Tripura",
    districts: [
      "Dhalai",
      "Gomati",
      "Khowai",
      "North Tripura",
      "Sepahijala",
      "South Tripura",
      "Unakoti",
      "West Tripura",
    ],
  },
  {
    state: "Uttarakhand",
    districts: [
      "Almora",
      "Bageshwar",
      "Chamoli",
      "Champawat",
      "Dehradun",
      "Haridwar",
      "Nainital",
      "Pauri Garhwal",
      "Pithoragarh",
      "Rudraprayag",
      "Tehri Garhwal",
      "Udham Singh Nagar",
      "Uttarkashi",
    ],
  },
  {
    state: "Uttar Pradesh",
    districts: [
      "Agra",
      "Aligarh",
      "Allahabad",
      "Ambedkar Nagar",
      "Amethi (Chatrapati Sahuji Mahraj Nagar)",
      "Amroha (J.P. Nagar)",
      "Auraiya",
      "Azamgarh",
      "Baghpat",
      "Bahraich",
      "Ballia",
      "Balrampur",
      "Banda",
      "Barabanki",
      "Bareilly",
      "Basti",
      "Bhadohi",
      "Bijnor",
      "Budaun",
      "Bulandshahr",
      "Chandauli",
      "Chitrakoot",
      "Deoria",
      "Etah",
      "Etawah",
      "Faizabad",
      "Farrukhabad",
      "Fatehpur",
      "Firozabad",
      "Gautam Buddha Nagar",
      "Ghaziabad",
      "Ghazipur",
      "Gonda",
      "Gorakhpur",
      "Hamirpur",
      "Hapur (Panchsheel Nagar)",
      "Hardoi",
      "Hathras",
      "Jalaun",
      "Jaunpur",
      "Jhansi",
      "Kannauj",
      "Kanpur Dehat",
      "Kanpur Nagar",
      "Kanshiram Nagar (Kasganj)",
      "Kaushambi",
      "Kushinagar (Padrauna)",
      "Lakhimpur - Kheri",
      "Lalitpur",
      "Lucknow",
      "Maharajganj",
      "Mahoba",
      "Mainpuri",
      "Mathura",
      "Mau",
      "Meerut",
      "Mirzapur",
      "Moradabad",
      "Muzaffarnagar",
      "Pilibhit",
      "Pratapgarh",
      "RaeBareli",
      "Rampur",
      "Saharanpur",
      "Sambhal (Bhim Nagar)",
      "Sant Kabir Nagar",
      "Shahjahanpur",
      "Shamali (Prabuddh Nagar)",
      "Shravasti",
      "Siddharth Nagar",
      "Sitapur",
      "Sonbhadra",
      "Sultanpur",
      "Unnao",
      "Varanasi",
    ],
  },
  {
    state: "West Bengal",
    districts: [
      "Alipurduar",
      "Bankura",
      "Birbhum",
      "Burdwan (Bardhaman)",
      "Cooch Behar",
      "Dakshin Dinajpur (South Dinajpur)",
      "Darjeeling",
      "Hooghly",
      "Howrah",
      "Jalpaiguri",
      "Kalimpong",
      "Kolkata",
      "Malda",
      "Murshidabad",
      "Nadia",
      "North 24 Parganas",
      "Paschim Medinipur (West Medinipur)",
      "Purba Medinipur (East Medinipur)",
      "Purulia",
      "South 24 Parganas",
      "Uttar Dinajpur (North Dinajpur)",
    ],
  },
];

const AnnexForm = (props) => {
  const setAnnexContent = props.setAnnexContent;
  const annexContent = props.annexContent;
  const appoinmentEnlarger = props.appoinmentEnlarger;
  const [districts, setDistrics] = useState(states[16].districts);
  const [formType, setFormType] = useState(false);

  const cancelAnnexForm = () => {
    setAnnexContent((prev) => {
      return { ...prev, defaultValues:{}, visibility: false };
    });
  };
  const { register, reset, handleSubmit } = useForm({});
  const onSubmit = (formdata) => {
    console.log(formdata)
    for(const k in formdata){
        if (typeof formdata[k]== "string"){
            
            formdata[k]=formdata[k]?.toUpperCase()
        }


    }

    setAnnexContent(prev=>{
        return {
            ...prev,
            defaultValues:formdata,
            formState:"D",
            applicationType:formType

        }
    })
  };
 
  
  useEffect(() => {
    reset({
      name: appoinmentEnlarger?.applicant_name,
      state: states[16].state,
      district: districts[8],
      ...annexContent?.defaultValues
    });
  }, []);

  return (
    <div class="annex__form__container">
      <div class="registration__container">
        <div class="registration__header">
          <h1>Annex c and d creation Form</h1>
          <p>Enter your applicant details</p>
        </div>
        <form class="annex__registration__body">
          <div class="registration__row">
            <div class="reg_first">
              <div class="input__field">
                <p>
                  <i class="fa-solid fa-star-of-life"></i> Name
                </p>
                <input
                  type="text"
                  placeholder="Applicant name"
                  {...register("name")}
                />
              </div>
            </div>
            <div class="reg_first">
              <div class="input__field">
                <p>
                  <i class="fa-solid fa-star-of-life"></i> Date of Birth
                </p>
                <input
                  type="date"
                  class="currentdate"
                  id="from"
                  {...register("dob")}
                />
              </div>
            </div>
          </div>
          <div class="registration__row">
            <div class="reg_first">
              <div class="input__field">
                <p>
                  <i class="fa-solid fa-star-of-life"></i> Place of Birth
                </p>
                <input
                  type="text"
                  placeholder="eg:valluvambram"
                  {...register("pob")}
                />
              </div>
            </div>
            <div class="reg_first">
              <div class="input__field">
                <p>
                  <i class="fa-solid fa-star-of-life"></i> Father Name
                </p>
                <input
                  type="text"
                  placeholder="Applicant fater name"
                  {...register("fname")}
                />
              </div>
            </div>
          </div>
          <div class="registration__row">
            <div class="reg_first">
              <div class="input__field">
                <p>
                  <i class="fa-solid fa-star-of-life"></i> ID no of father
                </p>
                <input
                  type="text"
                  placeholder="passport or voter id or adhar"
                  {...register("fid")}
                />
              </div>
            </div>
            <div class="reg_first">
              <div class="input__field">
                <p>
                  <i class="fa-solid fa-star-of-life"></i> Mother Name
                </p>
                <input
                  type="text"
                  placeholder="Applicant mother name"
                  {...register("mname")}
                />
              </div>
            </div>
          </div>

          <div class="registration__row">
            <div class="reg_first">
              <div class="input__field">
                <p>
                  <i class="fa-solid fa-star-of-life"></i> ID no of mother
                </p>
                <input
                  type="text"
                  placeholder="passport or voter id or adhar"
                  {...register("mid")}
                />
              </div>
            </div>
            <div class="reg_first">
              <div class="input__field">
                <p>State</p>

                <select
                  name="payment_status"
                  id=""
                  {...register("state", {
                    onChange: (e) => {
                      setDistrics(states[e.target.selectedIndex - 1].districts);
                    },
                  })}
                >
                  <option value="" disabled selected>
                    select a state
                  </option>
                  {states.map((state, index) => (
                    <option value={state.state} key={index}>
                      {" "}
                      {state.state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div class="registration__row">
            <div class="reg_first">
              <div class="input__field">
                <p>District</p>

                <select name="payment_status" id="" {...register("district")}>
                  <option value="">select a distirict</option>
                  {districts?.map((district, key) => (
                    <option value={district} key={key}>
                      {" "}
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div class="reg_first">
              <div class="input__field">
                <p>
                  <i class="fa-solid fa-star-of-life"></i> Pincode
                </p>
                <input
                  type="text"
                  placeholder="passport or voter id or adhar"
                  {...register("pincode")}
                />
              </div>
            </div>
          </div>
          <div class="registration__row">
            <div class="reg_first">
              <div class="input__field">
                <p>
                  <i class="fa-solid fa-star-of-life"></i> Address
                </p>
                <input
                  type="text"
                  placeholder="passport or voter id or adhar"
                  {...register("address")}
                />
              </div>
            </div>
            <div class="reg_first"></div>
          </div>
          <div className="toggle__container">
            <input onClick={(e) => setFormType((prev)=>!prev)} type="checkbox" />
            <label >
              do You want Annexure c{" "}
            </label>
          </div>

          {formType&&(<div>
            {" "}
            <div className="registration__row special">
            <div className="input__field radio" style={{"margin-bottom":"20px",marginLeft:"10px"}}>
                <p>Who is not present</p>
                <input
                  type="radio"
                  id="html"
                  name="fav_language"
                  value="father"
                  {...register("absenty")}
                />
                <label for="html" style={{fontSize:"12px"}}>Father</label>
                <br />
                <input
                  type="radio"
                  id="css"
                  name="fav_language"
                  value="mother"
                  {...register("absenty")}
                />
                <label style={{fontSize:"12px"}} for="css">Mother</label>
                <br />
              </div>
            </div>

            <div class="registration__row special">
              <div class="input__field">
                <input type="checkbox" {...register("a")} />{" "}
                <label>
                  The father/mother of the minor applicant is travelling
                  abroad/is on sea/travelling in India and unable to file
                  consent; or/and{" "}
                </label>
              </div>
            </div>
            <div class="registration__row special">
              <div class="input__field">
                <input type="checkbox" {...register("b")} />{" "}
                <label>
                  The father/mother is separated and no court case is pending
                  before the court regarding divorce/marital dispute/custody of
                  the child; or/and{" "}
                </label>
              </div>
            </div>
            <div class="registration__row special">
              <div class="input__field">
                <input type="checkbox" {...register("c")} />{" "}
                <label>
                  The father/mother has deserted and the whereabouts are not
                  known; or/and{" "}
                </label>
              </div>
            </div>
            <div class="registration__row special">
              <div class="input__field">
                <input type="checkbox" {...register("d")} />{" "}
                <label>
                  There is an ongoing court case for divorce/custody of the
                  minor child and the court has not given any order prohibiting
                  the issue of passport without the consent of father/mother;
                  or/and
                </label>
              </div>
            </div>
            <div class="registration__row special">
              <div class="input__field">
                <input type="checkbox" {...register("e")} />{" "}
                <label>
                  There is a court order for the custody of the minor child with
                  a parent who is applying for the passport and consent of other
                  parent (who has visitation rights) is not available or he/she
                  is refusing to give consent/the other parent is not availing
                  the visitation rights and his/her whereabouts are not known;
                  or/and
                </label>
              </div>
            </div>
            <div class="registration__row special">
              <div class="input__field">
                <input type="checkbox" {...register("f")} />{" "}
                <label>
                  The parents are judicially separated and custody of the minor
                  child has not been defined in the court’s decree; or/and
                </label>
              </div>
            </div>
            <div class="registration__row special">
              <div class="input__field">
                <input type="checkbox" {...register("g")} />{" "}
                <label>
                  The father/mother of
                  …………..............................................................................................
                  (name of minor child) has deserted me after the
                  conception/delivery. That
                  ………….................................
                  ………….................................... (name of minor child)
                  is exclusively under my care and custody since
                  separation/delivery.
                </label>
              </div>
            </div>
           
          </div>

          )}
          <div class="registration__footer">
          <div class="registration__confirm">
            <button class="goback" onClick={cancelAnnexForm}>
              Go back
            </button>
            <button style={{cursor:"pointer"}} onClick={handleSubmit(onSubmit)} class="create">
              Create{" "}
            </button>
          </div>
        </div>

          
        </form>
      </div>
    </div>
  );
};

export default AnnexForm;
