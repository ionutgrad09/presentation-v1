import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CssBaseline,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';

// --- Color Palette ---
const themeColors = {
  background: '#f8f9fa', // Very light grey
  textPrimary: '#212529', // Darkest grey
  textSecondary: '#6c757d', // Medium grey
  accent: '#ffc107', // Yellow
  accentHover: '#ffca28', // Lighter Yellow
  subtleBlue: '#e3f2fd', // Light Blue
};


// --- Styled Components for Premium Feel ---

const PremiumAppBar = styled(AppBar)`
background: rgba(233, 236, 239, 0.85); /* Light Grey Transparent */
backdrop-filter: blur(10px);
box-shadow: none;
border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const PremiumCard = styled(motion.div)`
border-radius: 12px;
overflow: hidden;
box-shadow: 0 8px 32px 0 rgba(33, 37, 41, 0.1);
border: 1px solid rgba(255, 255, 255, 0.18);
transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
height: 100%;

&:hover {
  transform: translateY(-10px);
  box-shadow: 0 16px 40px 0 rgba(33, 37, 41, 0.15);
}
`;

const PremiumButton = styled(motion.button)`
background: linear-gradient(45deg, ${themeColors.accent} 30%, ${themeColors.accentHover} 90%);
border: none;
border-radius: 50px;
color: ${themeColors.textPrimary};
padding: 12px 30px;
font-size: 1rem;
font-weight: bold;
cursor: pointer;
box-shadow: 0 3px 5px 2px rgba(255, 193, 7, 0.2);
transition: background 0.3s ease;

&:hover {
  background: linear-gradient(45deg, ${themeColors.accentHover} 30%, ${themeColors.accent} 90%);
}
`;

const AnimatedText = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        hidden: { opacity: 0, y: 20 },
      }}
    >
      {children}
    </motion.div>
  );
};

// --- Product Data ---
const products = [
    {id: 1, name: 'AURA SILK BLOUSE', description: 'Ethereal silk blouse with mother-of-pearl buttons.', price: '$320', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fGhpZ2glMjBmYXNoaW9ufGVufDB8fHx8MTY4MTMyNDE1Mw&ixlib=rb-4.0.3&q=80&w=400'},
    {id: 2, name: 'NOIR LEATHER JACKET', description: 'A timeless classic biker jacket in supple lambskin leather.', price: '$850', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEyfHxoaWdoJTIwZmFzaGlvbnxlbnwwfHx8fDE2ODEzMjQxNTM&ixlib=rb-4.0.3&q=80&w=400'},
    {id: 3, name: 'IVORY CASHMERE COAT', description: 'Unparalleled warmth and luxury in this pure cashmere coat.', price: '$1200', image: 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDl8fGhpZ2glMjBmYXNoaW9ufGVufDB8fHx8MTY4MTMyNDE1Mw&ixlib=rb-4.0.3&q=80&w=400'},
    {id: 4, name: 'CELESTE EVENING GOWN', description: 'Flowing evening gown with intricate hand-sewn beadwork.', price: '$2500', image: 'https://images.unsplash.com/photo-1598495538338-2f694250811e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDE3fHxoaWdoJTIwZmFzaGlvbnxlbnwwfHx8fDE2ODEzMjQxNTM&ixlib=rb-4.0.3&q=80&w=400'},
    {id: 5, name: 'ONYX TAILORED TROUSERS', description: 'Impeccably tailored trousers cut from a rich wool blend.', price: '$450', image: 'https://images.unsplash.com/photo-1529391409740-59f2dea52076?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDIzfHxoaWdoJTIwZmFzaGlvbnxlbnwwfHx8fDE2ODEzMjQxNTM&ixlib=rb-4.0.3&q=80&w=400'},
    {id: 6, name: 'GOLDEN SUNGLASSES', description: 'Chic oversized sunglasses with 24k gold plated details.', price: '$600', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDE5fHdoaWdoJTIwZmFzaGlvbnxlbnwwfHx8fDE2ODEzMjQxNTM&ixlib=rb-4.0.3&q=80&w=400'},
    {id: 7, name: 'AZURE DENIM JACKET', description: 'A modern take on a classic with a unique azure finish.', price: '$280', image: 'https://images.unsplash.com/photo-1543087903-1ac2378a2741?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'},
    {id: 8, name: 'CRIMSON VELVET LOAFERS', description: 'Plush velvet loafers in a deep crimson for a statement look.', price: '$410', image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'},
];

// --- Components ---

const ProductCard = ({ product }) => (
  <Grid item xs={12} sm={6} md={3}>
    <PremiumCard
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card sx={{ background: '#ffffff', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component={motion.div}
          style={{ height: 380 }}
          image={product.image}
          title={product.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <CardContent sx={{ flexGrow: 1, color: themeColors.textPrimary }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            {product.name}
          </Typography>
          <Typography variant="body2" color={themeColors.textSecondary}>
            {product.description}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
            {product.price}
          </Typography>
        </CardContent>
      </Card>
    </PremiumCard>
  </Grid>
);

const HomePage = () => (
  <Container sx={{ py: 8 }} maxWidth="xl">
     <AnimatedText>
      <Typography variant="h2" align="center" gutterBottom sx={{ color: themeColors.textPrimary, fontWeight: 'bold', mb: 6, textTransform: 'uppercase', letterSpacing: '3px' }}>
        The Collection
      </Typography>
    </AnimatedText>
    <Grid container spacing={4}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  </Container>
);

const AboutPage = () => (
    <Container sx={{ py: 8 }}>
      <AnimatedText>
        <Typography variant="h2" align="center" gutterBottom sx={{ color: themeColors.textPrimary, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '3px' }}>
          About Elysian
        </Typography>
      </AnimatedText>
      <AnimatedText>
        <Typography variant="h5" align="center" color={themeColors.textSecondary} paragraph sx={{ mt: 4, mb: 6, fontStyle: 'italic' }}>
          "Crafting elegance, one thread at a time."
        </Typography>
      </AnimatedText>
       <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6}>
            <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                <img src="https://images.unsplash.com/photo-1556742517-531a7c0937a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Our Atelier" style={{ width: '100%', borderRadius: '12px' }} />
            </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
            <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <Typography variant="body1" paragraph sx={{color: themeColors.textPrimary}}>
                    Welcome to <strong>Elysian</strong>, where timeless design meets modern luxury. Founded in 2010, our brand was born from a desire to create exquisite fashion that transcends seasons.
                </Typography>
                <Typography variant="body1" paragraph sx={{color: themeColors.textPrimary}}>
                    Our atelier is where our dedicated team of artisans brings each design to life. From the initial sketch to the final stitch, every piece is meticulously crafted to ensure it not only looks beautiful but also feels incredible to wear.
                </Typography>
            </motion.div>
        </Grid>
    </Grid>
    </Container>
);

const ContactPage = () => (
    <Container sx={{ py: 8, minHeight: '70vh' }}>
       <AnimatedText>
        <Typography variant="h2" align="center" gutterBottom sx={{ color: themeColors.textPrimary, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '3px' }}>
          Get In Touch
        </Typography>
      </AnimatedText>
      <AnimatedText>
        <Typography variant="h5" align="center" color={themeColors.textSecondary} paragraph sx={{ mb: 6 }}>
          We'd love to hear from you for collaborations or press inquiries.
        </Typography>
      </AnimatedText>
      <Box component={motion.form}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2.5, maxWidth: '600px', mx: 'auto' }}>
            <input type="text" placeholder="Your Name" style={{ padding: '15px', width: '100%', borderRadius: '8px', border: '1px solid #ced4da', fontSize: '1rem' }} />
            <input type="email" placeholder="Your Email" style={{ padding: '15px', width: '100%', borderRadius: '8px', border: '1px solid #ced4da', fontSize: '1rem' }} />
            <textarea placeholder="Your Message" rows="5" style={{ padding: '15px', width: '100%', borderRadius: '8px', border: '1px solid #ced4da', fontSize: '1rem' }}></textarea>
            <PremiumButton type="submit" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Send Message</PremiumButton>
      </Box>
    </Container>
);

const App = () => {
  const [page, setPage] = useState('home');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage />;
      case 'about': return <AboutPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage />;
    }
  };

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
  
  const NavLinks = () => (
    <>
        <Button sx={{ color: themeColors.textPrimary, fontWeight: 600, mx: 1 }} onClick={() => setPage('home')}>Home</Button>
        <Button sx={{ color: themeColors.textPrimary, fontWeight: 600, mx: 1 }} onClick={() => setPage('about')}>About</Button>
        <Button sx={{ color: themeColors.textPrimary, fontWeight: 600, mx: 1 }} onClick={() => setPage('contact')}>Contact</Button>
    </>
  );

  return (
    <Box sx={{ bgcolor: themeColors.background }}>
      <CssBaseline />
      <PremiumAppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: themeColors.textPrimary, letterSpacing: '1px' }}>
            ELYSIAN
          </Typography>
          {isMobile ? (
              <>
                <IconButton aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ color: themeColors.textPrimary }}>
                    <MenuIcon />
                </IconButton>
                <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle} PaperProps={{ sx: { width: "240px", background: 'rgba(233, 236, 239, 0.95)' } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                        <IconButton onClick={handleDrawerToggle}><CloseIcon /></IconButton>
                    </Box>
                    <List>
                      {['Home', 'About', 'Contact'].map((text) => (
                        <ListItem button key={text} onClick={() => { setPage(text.toLowerCase()); handleDrawerToggle(); }}>
                          <ListItemText primary={text} sx={{ textAlign: 'center', color: themeColors.textPrimary }} />
                        </ListItem>
                      ))}
                    </List>
                </Drawer>
              </>
          ) : (
            <NavLinks />
          )}
        </Toolbar>
      </PremiumAppBar>
      <main>
          {renderPage()}
      </main>
      <Box sx={{ bgcolor: themeColors.subtleBlue, p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'bold', letterSpacing: '1px', color: themeColors.textPrimary }}>
          ELYSIAN
        </Typography>
        <Typography variant="subtitle1" align="center" color={themeColors.textSecondary} component="p">
          Luxury Fashion Redefined
        </Typography>
        <Typography variant="body2" color={themeColors.textSecondary} align="center" sx={{mt: 2}}>
          {'Copyright © '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </Box>
  );
};


export default App;