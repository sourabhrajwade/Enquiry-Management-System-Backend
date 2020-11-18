const Enq = require("./../models/enquiry");

exports.addEnquiry = async (req, res, next) => {
  try {
    const newEnquiry = await Enq.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      course: req.body.course,
      query: req.body.query,
    });
    if (newEnquiry) {
      res.status(200).json({
        message: "Successful",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error occured in equiry creation.",
      Error: error,
    });
  }
};

exports.editEnquiry = async (req, res, next) => {
  try {
    const enquiryId = req.body._id;
    const email = req.body.email;
    const phone = req.body.phone;
    const query = req.body.query;
    const updateEquiry = await Enq.findOneAndUpdate(
      { _id: enquiryId },
      { email, phone, query },
      { new: true, upsert: true }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error occured in editing equiry.",
      Error: error,
    });
  }
};

exports.deleteEnquiry = async (req, res, next) => {
  try {
    const enquiryId = req.body._id;
    const enquiryDe = await Enq.findByIdAndDelete(enquiryId);
    
    if (enquiryDe) {
      console.log(enquiryDe);
      res.status(200).json({
        message: "Enquiry deleted",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error in deletion",
      err,
    });
  }
};

exports.getAllEnquiry = async (req, res, next) => {
  const enquiries = await Enq.find();

  res.status(200).json({
    message: "List of enquiries",
    enquiries,
  });
};

exports.getEnquirybyName = async (req, res, next) => {
  const userName = req.body.name;
  const enquiries = await Enq.find({ name: userName });
  if (!enquiries) {
    return res.status(500).json({
      message: "Enquiry Doesnot exit.",
    });
  } else {
    res.status(200).json({
      message: "Enquiry found",
      enquiries,
    });
  }
};
