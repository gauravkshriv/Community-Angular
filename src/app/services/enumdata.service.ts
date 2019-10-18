import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnumdataService {


  constructor() { }


  kytname = new Map([ 

    ["BUILDER" , "Builder"],
   
    ["LAND_UPLOAD" , "Land owner"],
   
    ["END_USER_BUYER" , "Buyer"],
   
    ["END_USER_INVESTOR" , "Buyer Investor"],
   
    ["LAND_DEVELOPER" , "Land Developer"],
  
    ["LAND_OWNER" , "Land Owner"],
   
    ["BROKING_HOUSE" , "Broking House"],
      
    ["PROJECT_PARTICIPANT" , "Project Participant"],
   
    ["CONSULTANT" , "Consultant"],
   
    ["PROJECT_INVESTOR" , "Project Investor"],
   
    ["PROJECT_MENTOR" , "Project Mentor"],
  
    ["PRIMARY_MARKET" , "Primary Market"],
  
    ["SECONDARY_MARKET" , "Secondary Market"],
   
    ["PROJECT_HEAD" , "Project Head KYT"],
   
    ["LEGAL_CONSULATANT" , "Legal Consultant KYT"],

    ["IT_CONSULTANT", "IT Consultant"],

    ["MORTGAGE_CONSULTANT", "Mortgage Consultant"],

    ["ARCHITECTURE_CONSULTANT", "Architecture Consultant"],

    ["CONSTRUCTION_CONSULTANT", "Construction Consultant"],

    ["TRAINER","Trainer"],

    ["POOL_MENTOR","Pool Mentor"],

    ["DESIGNING_CONSULTANT", "Designing Consultant"],

    ["VENDOR", "Vendor"],

    ["END_USER_BUYER", "End User Buyer"],

    ["END_USER_INVESTOR", "End User Investor"],
   
    ["DATA_MANAGEMENT_CONSULTANT" , "Database Management"],
   
    ["INVESTMENT_BROKING_CONSULTANT" , "Broking Consultant"],

    ["PROJECT_INVESTMENT_CONSULTANT", "Project Investment Consultant"],
    
    ["BROKING_CONSULTANT", "Broking Consultant"],
   
    ["PROJECT_MENTOR_LAND_UPLOAD" , "Project Mentor Land Upload"],

    ["NEED_ANALYSIS", "Need Analysis"],

    ["RISK_ANALYSIS","Risk Analysis"],

    ["SALES_CLOSING", "Sales Closing"],

    ["DIGITAL_MEDIA_MARKETING", "Digital Media Marketing"],

    ["LAND_INVESTMENT", "Land Investment"],

    ["VC_INVESTMENT","V C investment"],

    ["LAND_DUE_DILIGENCE","Land Due Dilligence"],

    ["PROJECT_DUE_DILIGENCE","Project Due Dilligence"],

    ["PROPERTY_DUE_DILIGENCE","Property Due Dilligence"],

    ["MORTGAGE_DUE_DILIGENCE", "Mortgage Due Dilligence"],

    ["PROJECT_CONCEPTUALIZATION","project Conceptualization"],

    ["IT_DIGITAL_MEDIA_MARKETING","IT Digital Media Marketing"],

    ["DATABASE_MANAGEMENT","Database Management"],

    ["SAFTEY_MANAGEMENT","Safety Management"],

    ["FACILITY_MANAGEMENT","Facility Management"],

    ["MANPOWER_SOURCING_MANAGEMENT","Manpower Sourcing Management"],

    ["MATERIAL_SOURCING_MANAGEMENT","Material Sourcing Management"],

    ["BLOCKCHAIN_TRAINER","Blockchain Trainer"],

    ["DIGITAL_MARKETING_TRAINER","Digital Marketing Trainer"],

    ["REAL_ESTATE_TARINER","Real Estate Trainer"],

    ["SALES_MARKETING_TRAINER","Sales Marketing Trainer"],

    ["DRAFTING","Drafting"],

    ["INTERIOR_AND_EXTERIOR_DESIGN","Interior and Exterior Trainer"],

    ["LAND_SURVEY","Land Survey"],

    ["PROJECT_QUALITY_ASSESSMENT_CONSULTING","Project Quality Assessment Consulting"],

    ["PROJECT_SELF_SUSTAINABILITY_CONSULTING","Project Self Sustainability Consulting"],

    ["MATERIAL_SUPPLIER","Material Supplier"]
    ]);
}
