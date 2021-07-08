import WatchedEpisodes from '../../db/models/watchedEpisodes';
import dbConnect from '../../db/mongodb';

dbConnect();

//  eslint-disable-next-line consistent-return
const handler = async (req, res) => {
  try {
    const watchedEpisodesDoc = await WatchedEpisodes.findOne({ userEmail: req.body.userEmail });

    if (!watchedEpisodesDoc) {
      const newWatchedEpisodesDoc = new WatchedEpisodes({
        userEmail: req.body.userEmail,
        watchedEpisodes: req.body.episodeId,
      });
      await newWatchedEpisodesDoc.save();
      return res.status(201).send(newWatchedEpisodesDoc);
    }

    if (req.body.status === 'unwatched') {
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
      return res.status(200).send(unWatchedEpisodeId);
    }

    const watchedEpisodesArr = watchedEpisodesDoc.watchedEpisodes;

    watchedEpisodesArr.push(req.body.episodeId);
    watchedEpisodesDoc.watchedEpisodes = watchedEpisodesArr;
    await watchedEpisodesDoc.save();
    return res.status(200).send(watchedEpisodesDoc);
  } catch (e) {
    res.status(500).send({ error: 'Something went wrong.' });
  }
};

export default handler;
