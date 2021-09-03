import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import BackDropWithSpinner from '../components/BackdropWithSpinner';
import DetailedStatCardWrapper from '../components/DetailedStatCardWrapper';
import DevtoCard from '../components/DevtoCard';
import ErrorPage from '../components/ErrorPage';
import CustomHead from '../components/Head';
import StatCard from '../components/StatCard';
import { useArticlesContext } from '../context/ArticlesContext';
import type { DevtoSortOptions } from '../types/general';
import { IArticle } from '../types/general';
import { fetcher } from '../utils/fetcher';

const Devto = (): JSX.Element => {
  const { data, error } = useSWR('/api/devto', fetcher);
  const [sortedArticles, setSortedArticles] = useState<IArticle[] | undefined>(
    undefined
  );
  const [sortType, setSortType] = useState<DevtoSortOptions>('date');
  const { setArticles } = useArticlesContext();

  useEffect(() => {
    const sortArray = (type: DevtoSortOptions) => {
      const types = {
        date: 'published_at',
        views: 'page_views_count',
        likes: 'public_reactions_count',
        comments: 'comments_count',
      };
      const sortProperty = types[type];
      const artArr = data.articles;
      const sorted = [...artArr].sort(
        (a, b) => b[sortProperty] - a[sortProperty]
      );
      setSortedArticles(sorted);
    };

    if (data) {
      sortArray(sortType);
      setArticles(data.articles);
    }
  }, [sortType]);

  if (error) return <ErrorPage />;
  if (!data) return <BackDropWithSpinner open={true} />;

  const renderArticles = (articles: Array<IArticle>) => {
    return (
      <div>
        {articles.map((article) => (
          <DevtoCard {...article} key={article.id} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <CustomHead title="dev.to stats" />
      <Box m={3}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} md={3}>
            <DetailedStatCardWrapper
              title="Followers"
              value={data.followersCount}
              query="/api/stats/devto"
              isDevto
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Total Posts" value={data.articles.length} />
          </Grid>
        </Grid>
      </Box>
      <Typography variant="h3" align="center" gutterBottom>
        Blog Posts on dev.to
      </Typography>
      <Box m={3}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Sorted by</FormLabel>
          <RadioGroup
            row
            aria-label="sort"
            name="sorted-articles"
            value={sortType}
            onChange={(event) =>
              setSortType(event.target.value as DevtoSortOptions)
            }
          >
            <FormControlLabel
              value="date"
              control={<Radio />}
              label="Published Date"
            />
            <FormControlLabel value="views" control={<Radio />} label="Views" />
            <FormControlLabel
              value="likes"
              control={<Radio />}
              label="Reactions"
            />
            <FormControlLabel
              value="comments"
              control={<Radio />}
              label="Comments"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      {sortedArticles
        ? renderArticles(sortedArticles)
        : renderArticles(data.articles)}
    </div>
  );
};

export default Devto;
