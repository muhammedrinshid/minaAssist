import React, { useState } from 'react'
import { useController, useFormContext } from 'react-hook-form';
import Select from 'react-select';

const options=[
    {
        "value": "a3ab30a5-78a7-4117-97cf-421565ead325",
        "label": "ABSA Cargo Airline"
    },
    {
        "value": "3e4a8c45-48b0-4bcc-a92d-436ec1a8f260",
        "label": "Adria Airways"
    },
    {
        "value": "d62adc0f-9aa2-4736-a5b5-2d90a260ac1a",
        "label": "Aegean Airlines"
    },
    {
        "value": "a4641bb7-a0d9-46dc-b106-d59659e093fa",
        "label": "Aer Lingus"
    },
    {
        "value": "6edce955-e248-418a-8ea8-c94fe1020277",
        "label": "Aero República"
    },
    {
        "value": "18db86a4-1573-4950-b2b0-05aa9e44a02f",
        "label": "Aeroflot"
    },
    {
        "value": "7b58a8de-dfd4-44c2-a85a-dd1ee679093e",
        "label": "Aerolineas Argentinas"
    },
    {
        "value": "b9b88f8b-aa5e-4bbb-8797-3f3807e7d53e",
        "label": "Aerolineas Galapagos S.A. Aerogal"
    },
    {
        "value": "b3808e13-4951-4d6a-8de0-b413a213ea4b",
        "label": "Aeromexico"
    },
    {
        "value": "3e68fc50-4c52-427f-b4e6-051f3af0b1bd",
        "label": "Afriqiyah Airways"
    },
    {
        "value": "5831f4cb-bcf7-4350-b87f-99648d511894",
        "label": "Aigle Azur"
    },
    {
        "value": "4d1ef9d2-d799-4275-b498-136d016451f1",
        "label": "Air Algérie"
    },
    {
        "value": "3f6e619f-d7b3-4eb2-ad6a-77504482c84b",
        "label": "Air Arabia"
    },
    {
        "value": "95bfe192-19ad-4744-b03b-f9eb722ba66b",
        "label": "Air Astana"
    },
    {
        "value": "9113d651-1507-4d06-b3d7-fb10b642fb6a",
        "label": "Air Austral"
    },
    {
        "value": "c77fccf4-1262-4fbf-ab65-e72cb4001b4a",
        "label": "Air Baltic"
    },
    {
        "value": "17cad9d2-b04b-42b4-9974-a4aa59e304af",
        "label": "Air Berlin"
    },
    {
        "value": "48c08719-6cd4-4ffe-b117-d94b53812b21",
        "label": "Air Botswana"
    },
    {
        "value": "d47b2e14-edf0-4440-a748-a1e563e9783e",
        "label": "Air Caledonie"
    },
    {
        "value": "bfa71eb7-cf4b-4663-a070-d027ba0d2553",
        "label": "Air Canada"
    },
    {
        "value": "e9201be8-42e9-4bda-a420-a11f7475bf67",
        "label": "Air China Limited"
    },
    {
        "value": "306f277b-f645-417f-913a-1ae38bf914b3",
        "label": "Air Corsica"
    },
    {
        "value": "b0a0ea6f-015e-4924-b127-0fa54a4fa64b",
        "label": "Air Europa"
    },
    {
        "value": "f6855358-336a-4305-8ba0-313a95524287",
        "label": "Air France"
    },
    {
        "value": "e7a02308-40dc-4957-a8c3-1b405a220991",
        "label": "Air India"
    },
    {
        "value": "8d751991-0655-4b24-a6c3-429910a6a8b8",
        "label": "Air Koryo"
    },
    {
        "value": "87b2a998-9998-4b90-8b2b-9d5c0718c22d",
        "label": "Air Macau"
    },
    {
        "value": "3f3ffbfa-756c-401c-91ed-fe55577de049",
        "label": "Air Madagascar"
    },
    {
        "value": "90b8c8d3-d69a-4ec0-8f75-3103ecbb0a2d",
        "label": "Air Malta"
    },
    {
        "value": "df42e2c0-4b58-489e-bbb7-f0a1ff96966c",
        "label": "Air Mauritius"
    },
    {
        "value": "e1bea972-3ba9-44b3-b2b2-960fe69a9c8d",
        "label": "Air Moldova"
    },
    {
        "value": "b7029e85-1352-4417-a98b-5250d54b0812",
        "label": "Air Namibia"
    },
    {
        "value": "3519aeb6-bbe9-4909-a7ce-060b73339039",
        "label": "Air New Zealand"
    },
    {
        "value": "b25d6a59-c593-4cc3-81c6-7d3ccbbca1e0",
        "label": "Air Niugini"
    },
    {
        "value": "4405ebac-3fff-4432-9257-850cc6770eff",
        "label": "Air Nostrum"
    },
    {
        "value": "5373d5ff-d137-43ea-afc0-84c4fe68fd06",
        "label": "Air One S.p.A."
    },
    {
        "value": "8d43c9d2-67ea-44c7-8b3c-c459727bfae1",
        "label": "Air SERBIA a.d. Beograd"
    },
    {
        "value": "fbc92049-4799-4eb5-8f20-e4936daef35d",
        "label": "Air Seychelles"
    },
    {
        "value": "2ae829b2-ce85-44c2-82f2-7857fc528b70",
        "label": "Air Tahiti"
    },
    {
        "value": "ccb98b3f-4efe-4e36-a007-12d00be697a7",
        "label": "Air Tahiti Nui"
    },
    {
        "value": "04bbb322-9fb3-4901-a197-f20cebba3d52",
        "label": "Air Transat"
    },
    {
        "value": "0d21ec15-3317-4bff-8f95-c9d6ae6da0ae",
        "label": "Air Uganda"
    },
    {
        "value": "740a31fb-7215-4ad7-85f5-14c3d9c1118b",
        "label": "Air Vanuatu"
    },
    {
        "value": "21ad3ee0-a9f9-4377-ad88-5b4a73dc05d4",
        "label": "AirBrvaluegeCargo Airlines"
    },
    {
        "value": "b98d35c5-c6c6-4afe-9abe-2e8958214e5f",
        "label": "Aircalin"
    },
    {
        "value": "dce3002a-15b9-4abb-86be-957f20635c87",
        "label": "Airlink"
    },
    {
        "value": "40c184cd-4157-4808-9e0d-7e5b69595803",
        "label": "Alaska Airlines"
    },
    {
        "value": "0a6b814d-7f48-4043-80c9-c84d10271848",
        "label": "Alitalia"
    },
    {
        "value": "b8c92824-acc1-454e-a4d6-bb096aba6b25",
        "label": "All Nippon Airways"
    },
    {
        "value": "420d4520-e823-402c-8ebd-63dc3c8022b4",
        "label": "AlMasria Universal Airlines"
    },
    {
        "value": "094c5b43-b590-407c-9f70-398fa12afdba",
        "label": "ALS"
    },
    {
        "value": "338f0b12-490b-4d22-8b3b-e33736d079d5",
        "label": "American Airlines"
    },
    {
        "value": "1f7794fd-191f-4326-9fca-e3b6dc847f88",
        "label": "Arik Air"
    },
    {
        "value": "f1eba82e-4a02-4852-a02f-f5e1fda069e3",
        "label": "Arkia Israeli Airlines"
    },
    {
        "value": "b4536bd3-f76e-45fa-bf27-ab64ab87dbdc",
        "label": "Asia Pacific Airlines"
    },
    {
        "value": "f2f4695c-30db-4025-88ec-0b1c4cf02e18",
        "label": "Asiana"
    },
    {
        "value": "3b1d60ba-4b27-4158-a3b1-1f58c9dbba2c",
        "label": "Atlas Air"
    },
    {
        "value": "6bc7dcd6-80dc-458b-9309-9ccb926d2ccf",
        "label": "Atlasjet Airlines"
    },
    {
        "value": "eefa58ad-4ebb-4d0c-9d15-b5405eeed940",
        "label": "Austral"
    },
    {
        "value": "0135afc6-9de7-409b-8a6d-3e360b94b326",
        "label": "Austrian"
    },
    {
        "value": "aa96f1fa-af2b-4f50-aeab-6cad3d3c3949",
        "label": "AVIANCA"
    },
    {
        "value": "3a69bd79-c09f-41f4-af4d-2cb8caae5231",
        "label": "Avianca Brasil"
    },
    {
        "value": "041a0b5a-55d0-4c3c-a383-323b396a51cb",
        "label": "Azerbaijan Airlines"
    },
    {
        "value": "d0b68b0b-7a5c-414f-8e63-1495d134a4ca",
        "label": "B&H Airlines"
    },
    {
        "value": "f22a9f90-a4ce-40cc-a0ae-1f6e997f304b",
        "label": "Bangkok Air"
    },
    {
        "value": "e9a85113-7cd7-4458-9157-6dbec98230f3",
        "label": "Belavia - Belarusian Airlines"
    },
    {
        "value": "3956a0d9-b981-44ab-9293-aa60183306c9",
        "label": "BH AIR"
    },
    {
        "value": "520e1e2d-c4c7-465f-aa32-9bb9a52bd249",
        "label": "Biman"
    },
    {
        "value": "640586b6-c158-40c8-8ede-887b0ce0a54d",
        "label": "Binter Canarias"
    },
    {
        "value": "080b2a0f-baac-444b-a6d4-ab6a23feb295",
        "label": "Blue Panorama"
    },
    {
        "value": "3bace374-c360-4b02-8aee-2b285305dd8a",
        "label": "Blue1"
    },
    {
        "value": "bbdb9401-6c73-4c6b-a9e3-aa41b547d4d4",
        "label": "bmi Regional"
    },
    {
        "value": "972ebeb3-db9c-4344-bc71-937e771f6cb6",
        "label": "Boliviana de Aviación - BoA"
    },
    {
        "value": "4999ae5c-6a35-49ab-a51a-ea7c382b2be2",
        "label": "British Airways"
    },
    {
        "value": "495c8dba-3418-46b2-b414-2437bdb65bd9",
        "label": "Brussels Airlines"
    },
    {
        "value": "784cbc2e-9bd1-4498-9578-9766b3286592",
        "label": "Bulgaria air"
    },
    {
        "value": "08bebfaa-d8be-47f8-91cf-9876ae66042b",
        "label": "C.A.L. Cargo Airlines"
    },
    {
        "value": "18cefa22-87ac-46da-ae38-0a3e3ff366bd",
        "label": "Cargojet Airways"
    },
    {
        "value": "408138a3-b890-4286-af43-754251e622a9",
        "label": "Cargolux S.A."
    },
    {
        "value": "c571181d-0dcd-4712-8066-0317fc62cce6",
        "label": "Caribbean Airlines"
    },
    {
        "value": "7369b068-84d6-40af-8fc3-bb0321a2deec",
        "label": "Carpatair"
    },
    {
        "value": "bcdf1379-aebd-48c9-ac99-9394182d79ce",
        "label": "Cathay Pacific"
    },
    {
        "value": "cb91358d-2073-4e95-bd2b-4a196a2b4efe",
        "label": "China Airlines"
    },
    {
        "value": "a77b1646-306a-4492-ba97-785439956d4f",
        "label": "China Cargo Airlines"
    },
    {
        "value": "b2438a52-8c41-40c5-8704-91f3368a3226",
        "label": "China Eastern"
    },
    {
        "value": "c3f87367-89ef-4325-980a-554441234543",
        "label": "China Postal Airlines"
    },
    {
        "value": "cfcbb689-5f98-47e5-98fe-1915298df02a",
        "label": "China Southern Airlines"
    },
    {
        "value": "97417000-942c-4001-b457-c08446aba0a9",
        "label": "CityJet"
    },
    {
        "value": "14f09c2f-7143-4e9b-ae28-4a2ad7fac809",
        "label": "Comair"
    },
    {
        "value": "af9ecaec-036d-4e44-8c35-224f3887ae13",
        "label": "Condor"
    },
    {
        "value": "8caad842-7055-4583-9d68-6e3c0a4776f8",
        "label": "COPA Airlines"
    },
    {
        "value": "9dd849c9-d69a-4ebf-b7c0-d6c55e6f441d",
        "label": "Corendon Airlines"
    },
    {
        "value": "19c5426c-bd79-43ce-8a8b-6a34d300fade",
        "label": "Corsair International"
    },
    {
        "value": "74a4659a-c313-4c86-9e4d-6031b8352b9a",
        "label": "Croatia Airlines"
    },
    {
        "value": "aeb9faca-d8aa-463f-bf53-a4ce75fa0bda",
        "label": "Cubana"
    },
    {
        "value": "d6e3257d-37a9-4639-92d9-e7d1fac6f44a",
        "label": "Cyprus Airways"
    },
    {
        "value": "553ef25c-f99c-446e-8922-b61743ea4991",
        "label": "Czech Airlines j.s.c"
    },
    {
        "value": "56346568-e315-4e85-9dec-6877e887fa98",
        "label": "Delta Air Lines"
    },
    {
        "value": "dee5d679-a1c2-43c0-8bb0-08c26e8a4eda",
        "label": "DHL Air"
    },
    {
        "value": "66a24d6f-a6dd-46da-b358-0548a734cdbf",
        "label": "DHL Aviation EEMEA B.S.C.(c)"
    },
    {
        "value": "9c17bd8a-15c4-47ce-acc4-b5de3c179bb4",
        "label": "Donavia"
    },
    {
        "value": "2e50e766-76ed-4166-b312-f633df9aeff4",
        "label": "Dragonair"
    },
    {
        "value": "a93b3533-ef8d-4d00-aa95-2020aac44ad8",
        "label": "Egyptair"
    },
    {
        "value": "c48f897a-a689-4dff-9439-761f0d281a13",
        "label": "EL AL"
    },
    {
        "value": "067d063f-a2dd-4398-8088-004c070a6efc",
        "label": "Emirates"
    },
    {
        "value": "1cf142ce-3f59-461c-afa9-1af89de9e390",
        "label": "Estonian Air"
    },
    {
        "value": "f3a8d027-7b92-46b7-a004-80895a01029d",
        "label": "Ethiopian Airlines"
    },
    {
        "value": "ddf86b6a-0786-4dfc-985c-261f124ce558",
        "label": "Etihad Airways"
    },
    {
        "value": "6f993cee-8c1f-4466-96c4-a3743bf6beeb",
        "label": "Euroatlantic Airways"
    },
    {
        "value": "20526dc3-1bd3-44d0-8099-754c2198af55",
        "label": "European Air Transport"
    },
    {
        "value": "a51fe207-66f7-406f-9b6b-e1e24e0da8ff",
        "label": "Eurowings"
    },
    {
        "value": "3480fd30-f9fe-4bfc-8828-94dca8cfe57a",
        "label": "EVA Air"
    },
    {
        "value": "18fc1c68-3030-4f38-bff7-a289ad3fe543",
        "label": "Federal Express"
    },
    {
        "value": "3d06ad08-32f6-4c6a-b824-8f86eee92c6b",
        "label": "Fiji Airways"
    },
    {
        "value": "d1406315-b3c0-4a64-b107-a32774d9cc49",
        "label": "Finnair"
    },
    {
        "value": "3253aa63-9cc9-4ac7-8cf7-d0af826617b5",
        "label": "flybe"
    },
    {
        "value": "7b75938f-1170-460c-b665-a37df56490ed",
        "label": "Freebird Airlines"
    },
    {
        "value": "bbf21615-e484-498a-a8fb-265c7f637a34",
        "label": "Garuda"
    },
    {
        "value": "a3b4c3f5-edf7-4edb-9eb0-64d3c6b6f7ae",
        "label": "Georgian Airways"
    },
    {
        "value": "23245f8f-8d8c-4545-9182-846cbc2919bc",
        "label": "Germania"
    },
    {
        "value": "447c5023-b464-4d44-b95a-a0fa5aff2be7",
        "label": "Gulf Air"
    },
    {
        "value": "3f590db0-9630-4cab-830a-cef2ee5ca95e",
        "label": "Hahn Air"
    },
    {
        "value": "d3ff11d2-c586-4bb8-8ad3-680360df33c5",
        "label": "Hainan Airlines"
    },
    {
        "value": "ece7aeae-59f0-48d7-8b40-27db7ca339d1",
        "label": "Hawaiian Airlines"
    },
    {
        "value": "e3227c6f-8f47-43fa-8057-3989c7694a1d",
        "label": "Hi Fly"
    },
    {
        "value": "198ec66a-7e70-4748-aa74-5089d46239a6",
        "label": "Hong Kong Airlines"
    },
    {
        "value": "0e8d336f-9916-464c-b8ea-965d48aa2129",
        "label": "Hong Kong Express Airways"
    },
    {
        "value": "62232efb-fc16-484a-9871-86f35f92d333",
        "label": "IBERIA"
    },
    {
        "value": "1b0f850c-5ac7-441c-b9b0-168598068caa",
        "label": "Icelandair"
    },
    {
        "value": "86fe53e2-eab4-4b50-8ce5-9563018b7262",
        "label": "InselAir"
    },
    {
        "value": "195647da-e2e6-4e66-900b-1bbd188aed17",
        "label": "Interair"
    },
    {
        "value": "b202ac58-0009-48a3-b7ee-5010910dfceb",
        "label": "InterSky"
    },
    {
        "value": "42cb9f8b-a02a-451b-ac11-5e96d0c41189",
        "label": "Iran Air"
    },
    {
        "value": "3358058e-17c8-433f-a6ca-0a2fd81768bb",
        "label": "Iran Aseman Airlines"
    },
    {
        "value": "cc967e78-5058-4d17-8f16-7c8c3b5757f5",
        "label": "Israir"
    },
    {
        "value": "9e0556c4-3ae4-43f6-ad3b-ff4d28259dd1",
        "label": "Japan Airlines"
    },
    {
        "value": "b97b5f3e-c854-484e-96c7-f0fcbe83a6bd",
        "label": "Jazeera Airways"
    },
    {
        "value": "e26887ca-7076-4ca2-8939-d1a5c7de6d8e",
        "label": "Jet Airways"
    },
    {
        "value": "183ad99e-d967-42cc-9f14-10ac8666e592",
        "label": "Jet Lite (India) Limited"
    },
    {
        "value": "68d92aa5-6416-440c-8f31-2388b95a74d9",
        "label": "JetBlue"
    },
    {
        "value": "45992911-bde0-4d5c-a2e7-c9b3a903257e",
        "label": "Jordan Aviation"
    },
    {
        "value": "9bd99fa7-68f4-4aa1-8fcc-77101bff2dda",
        "label": "JSC Aircompany Yakutia"
    },
    {
        "value": "d33854b6-2b7d-4fcc-8e02-8a0a7732bf38",
        "label": "JSC Nordavia-RA"
    },
    {
        "value": "7bd855d1-70c7-4f23-808b-88d7900f7bec",
        "label": "Juneyao Airlines"
    },
    {
        "value": "31ee1e0d-a7f5-4387-a755-99ecd0b817b6",
        "label": "Kenya Airways"
    },
    {
        "value": "7ab2642e-8e60-4577-be18-55f644699837",
        "label": "Kish Air"
    },
    {
        "value": "90c233d6-414c-4f1f-b7bc-9e8312c946b6",
        "label": "KLM"
    },
    {
        "value": "2f4862da-edd0-4b5a-bee4-b44486527a37",
        "label": "Korean Air"
    },
    {
        "value": "f0b81d23-2a72-4208-8b23-1f380386e105",
        "label": "Kuwait Airways"
    },
    {
        "value": "6d538f5d-ed73-4a98-a451-30c09a916af7",
        "label": "LACSA"
    },
    {
        "value": "00938c3e-5473-4aca-839e-b8dd707be027",
        "label": "LAM"
    },
    {
        "value": "d5a22ee4-1419-4659-88f1-44495f4a9d44",
        "label": "Lan Airlines"
    },
    {
        "value": "96c9fd1c-1f5c-4f72-a654-c623af3f0a07",
        "label": "Lan Argentina"
    },
    {
        "value": "7b2af563-2766-42b8-a57c-06a236c624be",
        "label": "Lan Cargo"
    },
    {
        "value": "2c670ed6-86b9-42e5-93fa-bf6e44107e70",
        "label": "Lan Perú"
    },
    {
        "value": "d6351332-d953-4aa0-93fd-eaf42bd01f0d",
        "label": "LanEcuador"
    },
    {
        "value": "98bb602c-3b3d-4172-980f-e2ed78014609",
        "label": "LIAT Airlines"
    },
    {
        "value": "58d12c43-2b62-4811-b633-9cb9c154fa3b",
        "label": "Libyan Airlines"
    },
    {
        "value": "37adab53-fefe-4042-8753-c823bcb8200d",
        "label": "LLC \"NORD WIND\""
    },
    {
        "value": "1d4f2d10-22a5-45e6-b597-22d634e93a70",
        "label": "LOT Polish Airlines"
    },
    {
        "value": "5889f32b-30f9-4655-a9de-fde100e3a928",
        "label": "Lufthansa"
    },
    {
        "value": "8359bcdb-abb0-4e85-a89a-1ca8681c4877",
        "label": "Lufthansa Cargo"
    },
    {
        "value": "ac02b58f-441d-439b-a1f7-135295364518",
        "label": "Lufthansa CityLine"
    },
    {
        "value": "e3e01fac-e12c-456f-9cce-96e705c0780f",
        "label": "Luxair"
    },
    {
        "value": "a92921bd-bbfe-4843-9a9d-55ab16b85002",
        "label": "Mahan Air"
    },
    {
        "value": "011f8387-a618-446d-886f-cc30abb7eb2a",
        "label": "Malaysia Airlines"
    },
    {
        "value": "70eec381-4c18-4120-9cb9-011ba165758b",
        "label": "Malmö Aviation"
    },
    {
        "value": "76ff1c8f-4be2-4075-8a0c-5368b0b67834",
        "label": "Martinair Cargo"
    },
    {
        "value": "5c50f2a9-6d0d-4d6e-a441-c8f36093fe11",
        "label": "MAS AIR"
    },
    {
        "value": "0ab2824e-e783-43e9-9147-9b6ffb3de54c",
        "label": "MEA"
    },
    {
        "value": "6f40d390-c601-4870-b4e7-4fe0ec500910",
        "label": "Mervalueiana fly"
    },
    {
        "value": "b40727cf-4108-4337-b022-5e74085618e7",
        "label": "MIAT"
    },
    {
        "value": "1a52899c-f7db-4302-9dce-2a492296ab50",
        "label": "Montenegro Airlines"
    },
    {
        "value": "2862e904-b2ce-418f-8344-c385929380c0",
        "label": "Nesma Airlines"
    },
    {
        "value": "f41a173a-2b32-42aa-93ff-3c523e534b86",
        "label": "NIKI"
    },
    {
        "value": "56a65aa9-cf8c-4197-91d4-a439cdd5ed67",
        "label": "Nile Air"
    },
    {
        "value": "263f7028-0c61-4ae6-9fad-6f5164a85972",
        "label": "Nippon Cargo Airlines (NCA)"
    },
    {
        "value": "f499972b-3654-48ae-be24-b22eef1beff3",
        "label": "Nouvelair"
    },
    {
        "value": "dd94594d-83e6-416a-9406-4b7153c95b20",
        "label": "Olympic Air"
    },
    {
        "value": "f2357e6e-ce7f-4da8-b3a7-4f2f48003387",
        "label": "Oman Air"
    },
    {
        "value": "61b424c9-c011-4d81-abcc-0ba509a0385d",
        "label": "Onur Air"
    },
    {
        "value": "71422cc7-c0f2-4217-ac0c-3a5ea88c3ea9",
        "label": "PAL"
    },
    {
        "value": "7fe97681-8b8f-4445-b0cb-33ee07056bdd",
        "label": "Pegasus Airlines"
    },
    {
        "value": "9fe89912-c4e2-449a-b8e2-a7edae8e6d86",
        "label": "PGA-Portugália Airlines"
    },
    {
        "value": "598e2feb-007f-4fd0-9bc3-6e142993714c",
        "label": "PIA"
    },
    {
        "value": "18a0d46a-d2d9-4744-bc35-0fc69c937512",
        "label": "Precision Air"
    },
    {
        "value": "c042f0c6-f483-45ae-a6c4-925d898b77b4",
        "label": "PrivatAir"
    },
    {
        "value": "2e664094-837c-44da-abed-f47bdb0b5b71",
        "label": "Qantas"
    },
    {
        "value": "0dcb481f-5248-4484-9203-8e342e5a52c5",
        "label": "Qatar Airways"
    },
    {
        "value": "c329afd7-3346-4c66-b073-c06deea184d6",
        "label": "Rossiya Airlines"
    },
    {
        "value": "0f952bcd-7c7b-41e1-9488-695bde2be699",
        "label": "Royal Air Maroc"
    },
    {
        "value": "2e976631-d35a-47ad-8b52-89535705bdfd",
        "label": "Royal Brunei"
    },
    {
        "value": "5f40d215-ef5c-45bc-b7f3-91404bcd5858",
        "label": "Royal Jordanian"
    },
    {
        "value": "1fc55110-9e74-4c29-81a0-acc9d6f48839",
        "label": "SAA"
    },
    {
        "value": "6a5347d1-18a7-430e-8a25-d637e8055d84",
        "label": "Safair"
    },
    {
        "value": "01e18f37-7b32-4afe-9e02-425d41ebd202",
        "label": "Safi Airways"
    },
    {
        "value": "7dc11ad0-e83d-4313-a554-10292a3d664e",
        "label": "SAS"
    },
    {
        "value": "eb3fa087-b825-4f06-a268-be8c30f408d0",
        "label": "SATA Air Açores"
    },
    {
        "value": "258c9a5d-5711-4b8f-821c-5b78aab89a0b",
        "label": "SATA Internacional"
    },
    {
        "value": "48b46cac-b0b3-4c3a-93d1-34f719f72738",
        "label": "Saudi Arabian Airlines"
    },
    {
        "value": "3c3d5515-c6f0-402a-b824-cb1152ae44c9",
        "label": "Shandong Airlines"
    },
    {
        "value": "953afdb5-e7bd-4c50-82c5-8e9b6a8f5a93",
        "label": "Shanghai Airlines"
    },
    {
        "value": "7ee8545e-d912-43cf-9a6b-40f9b310b313",
        "label": "Shenzhen Airlines"
    },
    {
        "value": "a50afd9a-995f-471d-ad1c-d1e60cd394f7",
        "label": "SIA"
    },
    {
        "value": "6ba25a86-2ee6-483a-a65b-0245e477a631",
        "label": "SIA Cargo"
    },
    {
        "value": "576657b6-b3e2-4c26-8a09-73cc184b123e",
        "label": "Siberia Airlines"
    },
    {
        "value": "28430059-2a2a-4271-9438-605b556f295a",
        "label": "Sichuan Airlines"
    },
    {
        "value": "8669d7d3-1bc8-4719-8aba-812446c1f525",
        "label": "Silkair"
    },
    {
        "value": "0d4d7cdd-6c20-477f-bfff-415103e28adc",
        "label": "South African Express Airways"
    },
    {
        "value": "417440b0-08fb-4ebe-b849-e944c4ca677b",
        "label": "SriLankan"
    },
    {
        "value": "3a1b1d20-330c-4cb0-9a71-3dbb40444dfa",
        "label": "Sudan Airways"
    },
    {
        "value": "f76bf8a6-d74c-424b-a0d6-56a5ee463675",
        "label": "SunExpress"
    },
    {
        "value": "a2e08729-bf7e-4b34-8860-b312e7037aee",
        "label": "Surinam Airways"
    },
    {
        "value": "16e9b633-2533-4d72-9e33-fd9a3cdf1eee",
        "label": "SWISS"
    },
    {
        "value": "eaa7dab2-5080-4ea8-b569-819e4e5b7931",
        "label": "SYPHAX AIRLINES"
    },
    {
        "value": "6df952cc-490e-4170-aa90-d011f0dd3340",
        "label": "Syrianair"
    },
    {
        "value": "e0a86dd5-06d2-443d-a557-10275a8566eb",
        "label": "TAAG - Angola Airlines"
    },
    {
        "value": "82b45d17-3abf-49b2-abc9-8b80a02c5b04",
        "label": "TACA"
    },
    {
        "value": "2ba6fe0b-81ec-4adf-8762-8dc65ddad8f9",
        "label": "TACA Peru"
    },
    {
        "value": "545fb134-3dd9-4039-8c69-d7ccf0af3778",
        "label": "TACV Cabo Verde Airlines"
    },
    {
        "value": "0c9f4c72-dc45-43df-ac7e-a31169b874d4",
        "label": "TAM - Transportes Aéreos del Mercosur Sociedad Anónima"
    },
    {
        "value": "2d182f37-2309-4b75-b9bd-2cf313013c3b",
        "label": "TAM Linhas Aéreas"
    },
    {
        "value": "c5ace404-3c88-4e84-8a4a-0318ffb65ee6",
        "label": "TAME - Linea Aérea del Ecuador"
    },
    {
        "value": "da18e54f-1f2c-4d8a-9503-1a7b86b41162",
        "label": "TAP Portugal"
    },
    {
        "value": "ea213078-7dc7-44af-a1a1-17637f01bd27",
        "label": "TAROM"
    },
    {
        "value": "a79c5ee7-7a2a-4217-b535-03e807791194",
        "label": "Tassili Airlines"
    },
    {
        "value": "cdb31a54-15ae-4774-a204-4f9b811bda79",
        "label": "Thai Airways International"
    },
    {
        "value": "7a6648b2-6347-46fb-803a-8aebdd4ff7d7",
        "label": "THY - Turkish Airlines"
    },
    {
        "value": "c8e66a5e-3e67-4617-b229-0a244a62f267",
        "label": "Tianjin Airlines"
    },
    {
        "value": "51f66cfd-19ec-4b2a-b46e-8a3cc693a6da",
        "label": "TNT Airways S.A."
    },
    {
        "value": "d606804e-1bad-4198-88fe-182459ef48e2",
        "label": "Transaero"
    },
    {
        "value": "5127b0e2-a08c-4932-b968-8a7a5819dfab",
        "label": "TransAsia Airways"
    },
    {
        "value": "23f42cfb-ab97-41bd-ba21-85c31c5bd90f",
        "label": "TUIfly"
    },
    {
        "value": "b6032e24-f54a-4480-863e-930e6800b3c0",
        "label": "Tunisair"
    },
    {
        "value": "dfe23661-24ba-4c7a-bd65-35e6e2909664",
        "label": "Ukraine International Airlines"
    },
    {
        "value": "e2be103b-5a4b-4f05-9c5b-8af1c9e6bf34",
        "label": "United Airlines"
    },
    {
        "value": "ca538672-38a2-41a3-81c4-74af530fe099",
        "label": "UPS Airlines"
    },
    {
        "value": "64b7b763-7f83-4249-be9f-628251cdeb48",
        "label": "US Airways"
    },
    {
        "value": "4992bb9c-45fd-48da-b6fc-0491e84fb7ac",
        "label": "UTair"
    },
    {
        "value": "290ad2fd-57c1-4ddd-a7e3-d872575d8cf9",
        "label": "Uzbekistan Airways"
    },
    {
        "value": "6e18637d-1024-4f41-a6b2-b2191b4c4aea",
        "label": "Vietnam Airlines"
    },
    {
        "value": "ca138ced-1d1f-4d9b-99dc-c16b7d5f824a",
        "label": "Virgin Atlantic"
    },
    {
        "value": "bdd843cc-0e5b-4952-b69b-ef33b173ba22",
        "label": "Virgin Australia"
    },
    {
        "value": "a96d71c4-5fe5-4bc3-b719-b3d54a9e6e0c",
        "label": "VLM Airlines"
    },
    {
        "value": "33af8260-b58c-47ec-8052-d5ea079c0f02",
        "label": "Volaris"
    },
    {
        "value": "e75d9dc1-c6a4-40ba-845d-f7f40550ea18",
        "label": "Volga-Dnepr Airlines"
    },
    {
        "value": "fdc574c9-8a32-4a48-ba0a-9d9daac0fc7d",
        "label": "VRG Linhas Aéreas S.A. - Grupo GOL"
    },
    {
        "value": "5e731d2a-f4f5-4efa-a461-5d96841fe8f3",
        "label": "White coloured by you"
    },
    {
        "value": "4cfc9569-a85d-422b-85b2-fbbd9cae72aa",
        "label": "Wvalueeroe"
    },
    {
        "value": "19e6b9e5-907a-41b1-8aaa-fa969fad7851",
        "label": "Xiamen Airlines"
    },
    {
        "value": "fc5b0d5e-edce-4c1f-9007-98baccc0b3e5",
        "label": "Yemenia"
    },
    {
        "value": "3183d4dc-377a-4d1f-843c-4e71f78f8767",
        "label": "Silk Way Airlines"
    },
    {
        "value": "06c09b9e-6f93-4fa8-933f-9f568641541a",
        "label": "Silk Way West Airlines Limited"
    },
    {
        "value": "033d4898-7c6c-4955-8667-668af1803199",
        "label": "air india express"
    },
    {
        "value": "9be72d6b-33a3-49af-952b-fe9cf65c33cf",
        "label": "flynas"
    },
    {
        "value": "9d90c1f9-88f3-4b15-9e90-8febf3a811ae",
        "label": "flydubai"
    },
    {
        "value": "8eb48e15-81d1-4f8c-a5d4-dbc4cfc366b4",
        "label": "gofirst"
    },
    {
        "value": "7216b35e-189a-4759-9932-90e76d03dd1d",
        "label": "indigo"
    },
    {
        "value": "e612ced5-d017-4dbc-9f18-2a0978beaa7a",
        "label": "spice jet"
    },
    {
        "value": "0be234c8-d977-4a58-8057-e32a49135f5f",
        "label": "air asia"
    },
    {
        "value": "44449de3-8d88-4d0a-91f0-f6abbd92a873",
        "label": "star air"
    },
    {
        "value": "e43adf88-4469-4610-b2e9-013341e44aef",
        "label": "akasa air"
    },
    {
        "value": "c8bcb0f2-5e2f-4bce-9eef-e570f3d3ef50",
        "label": "allince air"
    },
    {
        "value": "75ddf4df-ffd7-4827-acab-95fe643abb37",
        "label": "air odisha"
    },
    {
        "value": "c8d332d0-7038-4b85-b25d-5cbd21062be3",
        "label": "fastjet"
    },
    {
        "value": "3f715521-851c-4933-86f2-e10f84fa6c95",
        "label": "goair"
    },
    {
        "value": "3fa087df-6f4f-4c1f-bed6-891f7b4cba07",
        "label": "air arebia"
    },
    {
        "value": "139c7c51-4e5f-440c-9291-da0c8c87b3c8",
        "label": "malindo air"
    },
    {
        "value": "0471874f-6d7e-4003-91f0-3328088c613a",
        "label": "vistara airways"
    },
    {
        "value": "9a53bcd6-7339-4e4e-b138-4e72a349101f",
        "label": "south west airlines co"
    },
    {
        "value": "43cf3814-8e58-4ba8-a3c9-e52abc57bc37",
        "label": "scoot"
    },
    {
        "value": "b3d06632-7100-4fc2-83a9-9ad03d2ba70b",
        "label": "ryanair"
    },
    {
        "value": "110c3fea-d530-43cc-b2fb-07a89644f0d0",
        "label": "easyjet"
    }
]
const AirlineSelect = (props) => {
    const {control}=useFormContext()
    const {field:{value:airlineValue,onChange:airlineOnchange,...restAirLineField}}=useController({name:'airline',control})
    

    
    
    const customStyles={
        control:base=>({
            ...base,
            height:'27px',
            minHeight:20,

        borderRadius:6,
        border: '1px solvalue rgba(0, 0, 0, 0.492)',
        wvalueth:'100%'
            
           
        }),
        valueContainer:base=>({
            ...base,
            height:'20px',
        
            
           
        }),
        indicatorSeparator:base=>({
            ...base,
            // display:'none'        
            
           
        }),
       
        input:base=>({
            ...base,
            height:'20px'        
            
           
        }),
    }
 
    
  return (
    <Select
    styles={customStyles}
    
    options={options}
    value={airlineValue? options.find(x=> x.value===airlineValue):airlineValue}
    onChange={option=>airlineOnchange(option?option.value:option)}
    {...restAirLineField}

    />
  )
}

export default AirlineSelect