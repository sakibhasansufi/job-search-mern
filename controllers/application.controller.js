
import { Application } from "../models/application.model.js"
import { Job } from "../models/job.model.js"

export const applyJobs = async(req,res)=>{
    try {
        const userId = req.id;
        const jobId= req.params.id;
        if(!jobId){
            return res.status(400).json({
                message: "Job ID is required",
                success: false
            })
        };


        // check if the user has applied
        const existingApplication = await Application.findOne({job:jobId, applicant:userId});
        if(existingApplication){
            return res.status(400).json({
                message: "You have already applied",
                success: false
            })
        };

        //check if the job exist
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        };

        // create job application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId
        });

        job.application.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job application done successfully",
            success:true
        })
    } catch (error) {
        console.error(error);
    }
};


export const getAppliedJobs = async (req,res) =>{
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path: "job",
            options:{sort:{createdAt:-1}},
            populate:{
                path: "company",
                options:{sort:{createdAt:-1}}
            }
        });

        if(!application){
            return res.status(404).json({
                message: "No application is found",
                success: false
            })
        };

        return res.status(201).json({
            application,
            success: true
        })
    } catch (error) {
      console.error(error);  
    }
};

// how many students have applied in the job
export const getApplicants = async (req,res) =>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "application",
            options: {sort:{createdAt:-1}},
            populate:{
                path: "applicant"
            }
        });

        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        return res.status(201).json({
            job,
            success: true
        })

    } catch (error) {
      console.error(error);  
    }
};


export const updateStatus = async(req,res)=>{
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message: "status is required",
                success: false
            })
        };

        // find the application by applicant id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message: "application not found",
                success: false
            })
        };

        // update the status
        application.status = status.toLowerCase();
        await application.save();

            return res.status(200).json({
                message: "Status has been updated",
                success: true
            })
    } catch (error) {
        console.error(error);
    }
}