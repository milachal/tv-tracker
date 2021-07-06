import mongoose from 'mongoose';

const { Schema } = mongoose;

const userEpisodesSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  watchedEpisodes: [
    {
      type: String,
      required: true,
    },
  ],
});

const WatchedEpisodes = mongoose.models.WatchedEpisodes || mongoose.model('WatchedEpisodes', userEpisodesSchema);

export default WatchedEpisodes;
