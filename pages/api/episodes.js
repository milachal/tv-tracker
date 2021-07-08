import WatchedEpisodes from '../../db/models/watchedEpisodes';
import dbConnect from '../../db/mongodb';

dbConnect();
//  eslint-disable-next-line consistent-return
const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
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

  if (req.method === 'GET') {
    const { headers } = req;
    const userEmail = headers['user-email'];
    try {
      const watchedEpisodesDoc = await WatchedEpisodes.findOne({ userEmail });
      return res.status(200).send({ watchedEpisodes: watchedEpisodesDoc?.watchedEpisodes || [] });
    } catch (e) {
      res.status(500).send({ error: 'Something went wrong.' });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const watchedEpisodesDoc = await WatchedEpisodes.findOne({ userEmail: req.body.userEmail });
      let unWatchedEpisodeId = '';
      const reducedWatchedEpisodes = watchedEpisodesDoc.watchedEpisodes
        .reduce((acc, currEpisode) => {
          if (currEpisode !== req.body.episodeId) {
            return [...acc, currEpisode];
          }
          unWatchedEpisodeId = currEpisode;
          return acc;
        }, []);
      watchedEpisodesDoc.watchedEpisodes = reducedWatchedEpisodes;
      await watchedEpisodesDoc.save();
      res.status(200).send(unWatchedEpisodeId);
    } catch (e) {
      res.status(500).send({ error: 'Something went wrong' });
    }
  }
};

export default handler;
