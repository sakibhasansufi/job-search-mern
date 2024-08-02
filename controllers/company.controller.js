import { Company } from "../models/company.model.js"

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: 'Company name is required',
                success: false
            })
        };

        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: 'Company name must be unique',
                success: false
            })
        };

        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: 'Company has been created',
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

/// to find all the companies
export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(400).json({
                message: 'Companies not found',
                success: false
            })
        }
    } catch (error) {
        console.error(error)

    }
}

// to find individual company
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(400).json({
                message: 'Company not found',
                success: false
            })
        }

        return res.status(200).json({
            company,
            success: true
        })

    } catch (error) {
        console.error(error);
    }

}

// for updating the company
export const updateCompany = async (req,res) =>{
    try {
        
    } catch (error) {
        console.error(error)
    }
}