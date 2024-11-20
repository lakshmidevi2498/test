import { Accordion,CardActionArea, AccordionDetails, AccordionSummary, AppBar, Avatar, List,BottomNavigation, BottomNavigationAction, Box, Button, ButtonBase, ButtonGroup, Card, CardContent, CardMedia, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Drawer, FormControlLabel, Grid, IconButton, 
    ImageListItem, LinearProgress, ListItem, Menu, MenuItem, Modal, Pagination, Paper, Stack, Switch, TextField, Toolbar, Typography, 
    FormHelperText ,Select} from "@mui/material";
 import LanguageIcon from '@mui/icons-material/Language';
 import AccountCircleIcon from '@mui/icons-material/AccountCircle';
 import MenuIcon from '@mui/icons-material/Menu';
 import SearchIcon from '@mui/icons-material/Search';
 import { CheckBox, Close, DateRange, Facebook, Google, SpaRounded } from "@mui/icons-material"; 
 import AddIcon from '@mui/icons-material/Add';
 import RemoveIcon from '@mui/icons-material/Remove';
 import GoogleIcon from '@mui/icons-material/Google';
 import MailOutlineIcon from '@mui/icons-material/MailOutline';
 import AppleIcon from '@mui/icons-material/Apple';
 import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
 import IosShareIcon from '@mui/icons-material/IosShare';
 import FavoriteIcon from '@mui/icons-material/Favorite';
 import StarIcon from '@mui/icons-material/Star';
 import CelebrationIcon from '@mui/icons-material/Celebration';
 import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
 import StorefrontIcon from '@mui/icons-material/Storefront';
 import EditCalendarIcon from '@mui/icons-material/EditCalendar';
 import ChevronRightIcon from '@mui/icons-material/ChevronRight';
 import LocationCityIcon from '@mui/icons-material/LocationCity';
 import FlatwareIcon from '@mui/icons-material/Flatware';
 import WifiIcon from '@mui/icons-material/Wifi';
 import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
 import PoolIcon from '@mui/icons-material/Pool';
 import PhotoSizeSelectLargeIcon from '@mui/icons-material/PhotoSizeSelectLarge';
 import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
 import PhotoSizeSelectSmallIcon from '@mui/icons-material/PhotoSizeSelectSmall';
 import CallSplitIcon from '@mui/icons-material/CallSplit';
 import KeyboardAltIcon from '@mui/icons-material/KeyboardAlt';
 import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
 import SellIcon from '@mui/icons-material/Sell';
 import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
 import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
 import GridOnSharpIcon from '@mui/icons-material/GridOnSharp';
 import { ChevronLeft, ChevronRight } from '@mui/icons-material';
 import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone';
 import BeenhereTwoToneIcon from '@mui/icons-material/BeenhereTwoTone';
 import LanguageTwoToneIcon from '@mui/icons-material/LanguageTwoTone';
 import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
 import HomeIcon from '@mui/icons-material/Home';
 import BusinessIcon from '@mui/icons-material/Business';
 import HouseboatIcon from '@mui/icons-material/Houseboat';
 import FoodBankIcon from '@mui/icons-material/FoodBank';
 import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
 import LeakRemoveIcon from '@mui/icons-material/LeakRemove';
 import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
 import Autocomplete from '@mui/material/Autocomplete';
 import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
 import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'; 
 import FacebookIcon from '@mui/icons-material/Facebook';
 import StarBorderIcon from '@mui/icons-material/StarBorder';
 import LinkedInIcon from '@mui/icons-material/LinkedIn';
 import WhatsAppIcon from '@mui/icons-material/WhatsApp';
 import InstagramIcon from '@mui/icons-material/Instagram';
 import ListItemText from '@mui/material/ListItemText';
 import PinterestIcon from '@mui/icons-material/Pinterest';
 import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
 import StarBorderTwoToneIcon from '@mui/icons-material/StarBorderTwoTone'; 
 import { CardActions } from '@mui/material';
 import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'; 
 import PersonIcon from '@mui/icons-material/Person'; 
 import Radio from '@mui/material/Radio';
 import RadioGroup from '@mui/material/RadioGroup'; 
 import FormControl from '@mui/material/FormControl';
 import FormLabel from '@mui/material/FormLabel'; 
 import MinimizeIcon from '@mui/icons-material/Minimize';
 import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'; 
 import { Badge } from '@mui/material';
 import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
 import ArrowBackIcon from '@mui/icons-material/ArrowBack';
 import EditIcon from '@mui/icons-material/Edit';
 import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
 import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
 import Tooltip from '@mui/material/Tooltip';
 import LocalShippingIcon from '@mui/icons-material/LocalShipping';
 import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
 import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
 import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; 
 import CancelIcon from '@mui/icons-material/Cancel';
 
 
 
 const Controls =  { Grid,Typography,AppBar,Toolbar,Divider,SearchIcon,MenuIcon,LanguageIcon,AccountCircleIcon,ImageListItem,IconButton,Dialog,DialogActions,DialogContent,DialogTitle
    ,CheckBox,Accordion,AccordionDetails,AccordionSummary,Button,ButtonGroup,Drawer,Divider,Box,Card,CardContent,CardMedia,ListItem,Switch,ButtonBase,FormLabel,FormHelperText,
 Menu,MenuItem,Modal,Checkbox,FormControlLabel,TextField,Paper,DateRange,AddIcon,RemoveIcon,BottomNavigation,BottomNavigationAction,Stack,Pagination,Box,FormControl,
 Avatar,MenuItem,TextField,Close,Facebook ,GoogleIcon,MailOutlineIcon,AppleIcon,LocationOnOutlinedIcon,LinearProgress,List,WhatsAppIcon,InstagramIcon,FacebookOutlinedIcon
 ,IosShareIcon,FavoriteIcon,StarIcon,CelebrationIcon,TableRestaurantIcon,StorefrontIcon,EditCalendarIcon,StarBorderIcon,LinkedInIcon,PinterestIcon,ArrowForwardIosIcon,
 ChevronRightIcon,LocationCityIcon,FlatwareIcon,WifiIcon,TimeToLeaveIcon,PoolIcon,PhotoSizeSelectLargeIcon,ListItemText,StarBorderTwoToneIcon,
 PersonalVideoIcon,PhotoSizeSelectSmallIcon,CallSplitIcon,KeyboardAltIcon,KeyboardArrowDownIcon,SellIcon,CardActions,CalendarMonthIcon,ShoppingBagIcon,
 AssistantPhotoIcon,GridOnSharpIcon,FavoriteBorderIcon,ChevronLeft,ChevronRight,VerifiedTwoToneIcon,FacebookIcon,PersonIcon,Radio,RadioGroup,
 EditIcon,ShoppingBagOutlinedIcon,ArrowForwardIcon,Tooltip,LocalShippingIcon,ShoppingCartRoundedIcon,CheckCircleRoundedIcon,Select,CancelIcon,
 
 BeenhereTwoToneIcon,LanguageTwoToneIcon,Pagination,Autocomplete,FavoriteBorderSharpIcon,FoodBankIcon,HouseboatIcon,CardActionArea,Badge,ArrowBackIcon,
 BusinessIcon,HomeIcon,ExpandMoreIcon,LeakRemoveIcon,LocalPhoneIcon,KeyboardBackspaceIcon,CalendarTodayOutlinedIcon,MinimizeIcon,ShoppingCartOutlinedIcon,
 
 }
 export default Controls;