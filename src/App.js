import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  CssBaseline,
  IconButton,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const products = [
  {
    id: 1,
    name: 'Elegant Dress',
    description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: '$120',
    image: 'https://picsum.photos/400/400',
    details: 'Crafted from high-quality silk with hand-stitched details and a flattering fit.'
  },
  {
    id: 2,
    name: 'Casual Jacket',
    description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: '$90',
    image: 'https://picsum.photos/400/400',    details: 'Water-resistant and fleece-lined with zip-up closure and deep pockets.'
  },
  {
    id: 3,
    name: 'Trendy Sneakers',
    description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: '$70',
    image: 'https://picsum.photos/400/400',    details: 'Ergonomically designed sole with breathable mesh upper.'
  },
  {
    id: 4,
    name: 'Designer Handbag',
    description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: '$250',
    image: 'https://picsum.photos/400/400',    details: 'Italian leather, gold hardware, and multiple compartments.'
  },
  {
    id: 5,
    name: 'Slim Fit Blazer',
    description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: '$150',
    image: 'https://picsum.photos/400/400',    details: 'Structured design with inner lining and stretch fabric.'
  },
  {
    id: 6,
    name: 'Luxury Watch',
    description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: '$320',
    image: 'https://picsum.photos/400/400',
    details: 'Quartz movement, sapphire crystal, and water-resistant design.'
  }
];

const NavBar = () => (
  <AppBar position="sticky" elevation={10} sx={{ background: '#1a1a1a' }}>
    <Toolbar>
      <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 1 }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>FASHION ELITE</Link>
      </Typography>
      <Button color="inherit" component={Link} to="/">Home</Button>
      <Button color="inherit" component={Link} to="/about">About</Button>
      <Button color="inherit" component={Link} to="/contact">Contact</Button>
    </Toolbar>
  </AppBar>
);

const Footer = () => (
  <Box sx={{ py: 4, backgroundColor: '#1a1a1a', color: '#fff', mt: 6, textAlign: 'center' }}>
    <Typography variant="body2">&copy; {new Date().getFullYear()} Fashion Elite. All rights reserved.</Typography>
  </Box>
);

const Home = () => {
  const navigate = useNavigate();
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card onClick={() => navigate(`/product/${product.id}`)} sx={{ cursor: 'pointer' }}>
                <CardMedia component="img" height="200" image={product.image} alt={product.name} />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{product.description}</Typography>
                </CardContent>
                <CardActions>
                  <Typography variant="h6" color="primary">{product.price}</Typography>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  if (!product) return <Typography variant="h5" sx={{ m: 4 }}>Product not found.</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <motion.img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: 8 }}
                      initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <Typography variant="h4" gutterBottom>{product.name}</Typography>
            <Typography variant="h6" color="primary" gutterBottom>{product.price}</Typography>
            <Typography variant="body1" paragraph>{product.details}</Typography>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

const About = () => (
  <Container sx={{ mt: 4 }}>
    <Typography variant="h4" gutterBottom>About Fashion Elite</Typography>
    <Typography variant="body1">
      Fashion Elite is a premium online store delivering elegance, class, and timeless fashion. We focus on craftsmanship,
      premium materials, and unforgettable customer experience.
    </Typography>
  </Container>
);

const Contact = () => (
  <Container sx={{ mt: 4 }}>
    <Typography variant="h4" gutterBottom>Contact Us</Typography>
    <Typography variant="body1">
      Email: contact@fashionelite.com<br />
      Phone: +1 234 567 8901<br />
      Address: 123 Fashion Ave, New York, NY
    </Typography>
  </Container>
);

const App = () => (
  <Router>
    <CssBaseline />
    <NavBar />
    <Box sx={{ minHeight: 'calc(100vh - 64px)', backgroundColor: '#f5f5f5', py: 4 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Box>
    <Footer />
  </Router>
);

export default App;