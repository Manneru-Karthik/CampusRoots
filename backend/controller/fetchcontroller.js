const studentmodel=require('../models/Studentmodel');
const alumnimodel=require('../models/Alumnimodel');

const getstudents = async (req, res) => {

    try {
        const students = await studentmodel
          .find({}, { password: 0 }) // Exclude password
          .populate("batch", "year"); // Only select batch name and description
    
        const flattenedStudents = students.map((student) => ({
          _id: student._id,
          name: student.username,
          usn: student.usn,
          email: student.gmail,
          batchYear: student.batch?.year || "N/A", // Flatten batch name
        }));
    
        res.status(200).json(flattenedStudents);
      } catch (error) {
        console.error("Error fetching students with batch:", error);
        res.status(500).json({ error: "Failed to fetch students with batch" });
      }
    };

  const getalumnis = async (req, res) => {
    try {
        const alumnis = await alumnimodel
          .find({}, { password: 0, }) // Exclude sensitive fields
          .populate("batch", "year"); // Populate only the batch's `year`
       console.log("Hiii");
        // Flatten the alumni data
        const flattenedAlumnis = alumnis.map((alumni) => ({
          _id: alumni._id,
          name: alumni.username,
          email: alumni.gmail,
          expertise: alumni.expertise,
          currentRole: alumni.currentRole,
          achievements: alumni.achievements,
          batchYear: alumni.batch?.year || "N/A", // Extract batch year
        }));
    
        res.status(200).json(flattenedAlumnis);
      } catch (error) {
        console.error("Error fetching alumni with batch:", error);
        res.status(500).json({ error: "Failed to fetch alumni with batch" });
      }
    };

module.exports={getstudents,getalumnis};

