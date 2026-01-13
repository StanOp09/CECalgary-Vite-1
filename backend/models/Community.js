import mongoose from "mongoose";

const communitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    geoId: { type: String, required: true, trim: true, unique: true }, // matches GeoJSON feature property
    sector: { type: String, default: "" },
    stats: {
      houses: { type: Number, default: 0 },
      apartments: { type: Number, default: 0 },
      estimatedPopulation: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Community", communitySchema);
