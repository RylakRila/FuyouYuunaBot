import { Schema, model } from "mongoose";

const ConfigSchema = new Schema({
    guildId: String,
    configs: [{
        key: String,
        value: Schema.Types.Mixed
    }]
}, {
    collection: 'configs',
});

const Config = model("Config", ConfigSchema);

export default Config;