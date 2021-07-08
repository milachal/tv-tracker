import WatchedEpisodes from '../../db/models/watchedEpisodes';
import dbConnect from '../../db/mongodb';

dbConnect();

const getEpisodesHandler = async (req, res) => {
  const { headers } = req;
  const userEmail = headers['user-email'];

  try {
    const watchedEpisodesDoc = await WatchedEpisodes.findOne({ userEmail });
    return res.status(200).send({ watchedEpisodes: watchedEpisodesDoc?.watchedEpisodes || [] });
  } catch (e) {
    res.status(500).send({ error: 'Something went wrong.' });
  }
};

export default getEpisodesHandler;
