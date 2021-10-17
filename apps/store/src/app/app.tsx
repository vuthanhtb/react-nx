import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { Header } from '@nxegghead/store/ui-shared';
import { formatRating } from '@nxegghead/store/util-formatters';
import { StoreFeatureGameDetail } from '@nxegghead/store/feature-game-detail';
import { Game } from '@nxegghead/api/util-interfaces';

import './app.scss';

export function App() {
  const history = useHistory();
  const [state, setState] = useState<{
    data: Game[];
    loadingState: 'success' | 'error' | 'loading';
  }>({
    data: [],
    loadingState: 'success',
  });

  useEffect(() => {
    setState(pre => ({
      ...pre,
      loadingState: 'loading',
    }));
    fetch('/api/games')
      .then((x) => x.json())
      .then((res) => {
        setState(pre => ({
          ...pre,
          data: res,
          loadingState: 'success'
        }));
      })
      .catch((err) => {
        setState(pre => ({
          ...pre,
          loadingState: 'error',
        }));
      });
  }, []);

  return (
    <>
      <Header title="Board Game Hoard" />
      <div className="container">
        <div className="games-layout">
          {state.data.map((x) => (
            <Card
              key={x.id}
              className="game-card"
              onClick={() => history.push(`/game/${x.id}`)}
            >
              <CardActionArea>
                <CardMedia
                  className="game-card-media"
                  image={x.image}
                  title={x.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {x.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {x.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className="game-rating"
                  >
                    <strong>Rating:</strong> {formatRating(x.rating)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>

      <Route path="/game/:id" component={StoreFeatureGameDetail} />
    </>
  );
}

export default App;
