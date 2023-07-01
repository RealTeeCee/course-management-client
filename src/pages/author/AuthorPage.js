import { SearchOutlined } from "@ant-design/icons";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authorImage from "../../assets/images/author.jpg";
import { HeadingFormH1Com } from "../../components/heading";
import { StyledBadgeMuiCom } from "../../components/mui";
import { selectAllAuthorsState } from "../../store/author/authorSelector";
import {
  onLoadAuthorsPagination,
  onLoadSubcribesByUserId,
  onLoadTop3Authors,
  onSubcribeAuthor,
  onUnsubcribeAuthor,
} from "../../store/author/authorSlice";
import { selectAllCategoriesState } from "../../store/category/categorySelector";
import { onLoadCategories } from "../../store/category/categorySlice";
import { selectUser, selectUserId } from "../../store/auth/authSelector";

const AuthorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pagiAuthor, top3, subcribes } = useSelector(selectAllAuthorsState);
  const { categories } = useSelector(selectAllCategoriesState);
  const user = useSelector(selectUser);

  const [searchValue, setSearchValue] = useState({
    categoryId: 0,
    sortKey: "ASC",
    searchKey: "name",
    searchValue: "",
    pageNo: 0,
    pageSize: 2,
    isFilter: false,
  });

  const [filter, setFilter] = useState(false);
  const [isSubcribed, setIsSubcribed] = useState(false);

  // useEffect(() => {
  //   console.log(searchValue);
  //   if (searchValue.categoryId !== 0 || searchValue.searchValue.trim() !== "") {
  //     setFilter(true);
  //   } else {
  //     setFilter(false);
  //   }
  // }, [searchValue]);

  useEffect(() => {
    handleClickSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, searchValue.categoryId, searchValue.sortKey]);

  useEffect(() => {
    dispatch(onLoadTop3Authors());
    dispatch(onLoadCategories());
  }, [dispatch]);

  useEffect(() => {
    if (user && user.id > 0) {
      dispatch(onLoadSubcribesByUserId({ userId: user.id }));
    }
  }, [dispatch, user]);

  const handleSearch = (event) => {
    console.log(event.target);
    setFilter(true);
    setSearchValue((prev) => {
      return {
        ...prev,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      };
    });
  };

  const handleClickSearch = () => {
    dispatch(onLoadAuthorsPagination({ ...searchValue, isFilter: filter }));
  };

  const handleLoadMore = () => {
    console.log(searchValue);
    if (pagiAuthor) {
      dispatch(
        onLoadAuthorsPagination({
          ...searchValue,
          pageNo: pagiAuthor.number + 1,
        })
      );
    }
  };

  const handleSubcribe = (author) => {
    if (user && user.id > 0) {
      dispatch(
        onSubcribeAuthor({
          authorId: author.id,
          authorName: author.name,
          created_at: new Date(),
          id: Math.floor(Math.random() * 1000) + 1000,
          image: author.image,
          userId: user.id,
        })
      );
    } else {
      navigate("/login");
    }
  };

  const handleUnsubcribe = (author) => {
    dispatch(
      onUnsubcribeAuthor({
        authorId: author.id,
        authorName: author.name,
        created_at: new Date(),
        id: Math.floor(Math.random() * 1000) + 1000,
        image: author.image,
        userId: user.id,
      })
    );
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <img
            src={authorImage}
            alt="Lỗi"
            className="w-full h-60 object-cover"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} mt={10}>
          <HeadingFormH1Com>Meet our authors</HeadingFormH1Com>
          <Typography align="center" gutterBottom>
            Get to know the brilliant minds behind our courses, assessments and
            more
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} mt={10}>
          <Grid container spacing={1} justifyContent="center">
            {top3.map((t3) => (
              <Grid key={t3.id} item xs={12} sm={12} md={4}>
                <Card
                  elevation={12}
                  sx={{
                    maxWidth: 345,
                    background: "linear-gradient(to right, #8e2de2, #4a00e0);",
                    transition: "0.2s",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <Typography
                    variant="p"
                    align="center"
                    sx={{ display: "flex", justifyContent: "center" }}
                    mt="15px"
                  >
                    <StyledBadgeMuiCom
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                    >
                      <Avatar
                        alt={t3.name}
                        src={t3.image}
                        sx={{ width: 120, height: 120 }}
                      />
                    </StyledBadgeMuiCom>
                  </Typography>

                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        color: "whitesmoke",
                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      {t3.name !== null ? t3.name : "Unknown"}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "whitesmoke" }}>
                      {t3.title !== null ? t3.title : "None Title"}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {subcribes.length > 0 &&
                    subcribes.find((s) => s.authorId === t3.id) !==
                      undefined ? (
                      <Button
                        size="small"
                        variant="contained"
                        color="info"
                        onClick={() => handleUnsubcribe(t3)}
                      >
                        Unsubcribe
                        <NotificationsOffIcon
                          sx={{ ml: "5px", fontSize: "20px" }}
                        />
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => handleSubcribe(t3)}
                      >
                        Subcribe
                        <NotificationsNoneIcon
                          sx={{ ml: "5px", fontSize: "20px" }}
                        />
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12} mt={10}>
          <HeadingFormH1Com>Find your expert</HeadingFormH1Com>
          <Typography align="center" gutterBottom>
            Get to know the brilliant minds behind our courses, assessments and
            more
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} mt={10}>
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={12} sm={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Filter by Categories
                </InputLabel>
                <Select
                  name="categoryId"
                  labelId="demo-simple-select-label"
                  value={searchValue.categoryId}
                  onChange={handleSearch}
                  displayEmpty
                  label="Filter by Categories"
                >
                  <MenuItem value={0}>
                    <em>All Categories</em>
                  </MenuItem>
                  {categories.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label-2">
                  Sort by Joined Date
                </InputLabel>
                <Select
                  name="sortKey"
                  labelId="demo-simple-select-label-2"
                  value={searchValue.sortKey}
                  onChange={handleSearch}
                  defaultValue="ASC"
                  displayEmpty
                  label="Sort by Joined Date"
                >
                  <MenuItem value="ASC">
                    <em>Oldest</em>
                  </MenuItem>
                  <MenuItem value="DESC">Newest</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                fullWidth
                name="searchValue"
                id="standard-bare"
                variant="outlined"
                placeholder="Search authors"
                size="small"
                onChange={handleSearch}
                InputProps={{
                  endAdornment: (
                    <IconButton size="small" onClick={handleClickSearch}>
                      <SearchOutlined />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} mt={10}>
          <Grid container spacing={1} justifyContent="center">
            {pagiAuthor.content.map((a) => (
              <Grid key={a.id} item xs={12} sm={12} md={3}>
                <Grid container direction="column" alignItems="center">
                  <Grid item xs={12} sm={12} md={12}>
                    <Avatar
                      alt={a.name}
                      src={a.image}
                      sx={{ width: 120, height: 120 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography
                      gutterBottom
                      variant="h7"
                      component="div"
                      sx={{
                        color: "#333",
                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      {a.name !== null ? a.name : "Unknown"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} mt={10}>
          <Typography align="center">
            <Button
              size="medium"
              variant="contained"
              color="warning"
              disabled={pagiAuthor.last}
              onClick={handleLoadMore}
            >
              View more authors (800 more)
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthorPage;
