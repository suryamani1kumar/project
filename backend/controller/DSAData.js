import fs from "fs/promises";
import path from "path";

const dataFile = path.join(process.cwd(), "utils", "DsaList.json");

export const getDsaList = async (req, res) => {
  try {
    const data = await fs.readFile(dataFile, "utf-8");

    let jsonData = JSON.parse(data);

    return res.status(200).json({
      data: jsonData,
      message: "data fetch successfully",
    });
    
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateDataDsaList = async (req, res) => {
  try {
    const { category, topic, status } = req.body;

    const data = await fs.readFile(dataFile, "utf8");
    let jsonData = JSON.parse(data);

    const catIndex = jsonData.findIndex((c) => c.category === category);

    if (catIndex !== -1) {
      const subIndex = jsonData[catIndex].subTopics.findIndex(
        (t) => t.name === topic
      );
      if (subIndex !== -1) {
        jsonData[catIndex].subTopics[subIndex].status = status;

        const remaining = jsonData[catIndex].subTopics.find((t) => !t.status);
        jsonData[catIndex].status = remaining ? false : true;

        await fs.writeFile(dataFile, JSON.stringify(jsonData, null, 2));
      }
    }

    res.json({ success: true, message: "Update successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
