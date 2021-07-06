import WatchedEpisodes from '../../db/models/watchedEpisodes';
import dbConnect from '../../db/mongodb';

dbConnect();
// eslint-disable-next-line
const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      if (!req.body.episodeId) {
        const watchedEpisodesArr = await WatchedEpisodes.findOne({ userEmail: req.body.userEmail });
        return res.status(200).send(watchedEpisodesArr);
      }
      const userWatchedEpisodes = await WatchedEpisodes.findOneAndUpdate({
        userEmail: req.body.userEmail,
        $push: {
          watchedEpisodes: req.body.episodeId,
        },
        new: true,
        useFindAndModify: false,
      });

      if (!userWatchedEpisodes) {
        const newUserWatchedEpisodes = new WatchedEpisodes({
          userEmail: req.body.userEmail,
          watchedEpisodes: req.body.episodeId,
        });

        await newUserWatchedEpisodes.save();
        return res.status(201).send(newUserWatchedEpisodes);
      }
      res.status(200).send(userWatchedEpisodes);
    } catch (e) {
      res.status(500).send({ error: 'Something went wrong.' });
    }
  }
};

export default handler;
