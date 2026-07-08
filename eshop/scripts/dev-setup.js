const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const { hash } = require('bcrypt');

const PRODUCTS = [
  {
    name: "Velocity Pro Trainer",
    slug: "velocity-pro-trainer",
    description: "Lightweight training shoes engineered for speed, stability, and long-distance comfort.",
    price: 129.99,
    category: "Training",
    stock: 50,
    badge: "NEW",
    featured: true,
    images: ["https://via.placeholder.com/500x500?text=Velocity+Pro"],
  },
  {
    name: "Elite Running Shoe",
    slug: "elite-running-shoe",
    description: "Premium running shoes with responsive cushioning for marathon training.",
    price: 159.99,
    category: "Running",
    stock: 40,
    badge: "BESTSELLER",
    featured: true,
    images: ["https://via.placeholder.com/500x500?text=Elite+Running"],
  },
  {
    name: "Recovery Compression Sleeve",
    slug: "recovery-compression-sleeve",
    description: "High-performance compression wear for faster muscle recovery and injury prevention.",
    price: 49.99,
    category: "Recovery",
    stock: 100,
    badge: "NONE",
    featured: false,
    images: ["https://via.placeholder.com/500x500?text=Compression"],
  },
  {
    name: "Performance Training Backpack",
    slug: "performance-training-backpack",
    description: "Durable gym backpack with dedicated compartments for equipment and recovery essentials.",
    price: 89.99,
    category: "Accessories",
    stock: 30,
    badge: "NONE",
    featured: false,
    images: ["https://via.placeholder.com/500x500?text=Backpack"],
  },
  {
    name: "SwiftPace Running Watch",
    slug: "swiftpace-running-watch",
    description: "GPS running watch with heart rate monitor and workout tracking for serious athletes.",
    price: 199.99,
    category: "Accessories",
    stock: 25,
    badge: "LIMITED",
    featured: false,
    images: ["https://via.placeholder.com/500x500?text=Watch"],
  },
];

async function seedDatabase() {
  let mongoServer;
  try {
    console.log('🌱 Starting database seed...\n');

    // Start in-memory MongoDB
    console.log('📦 Initializing in-memory MongoDB...');
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    console.log('✓ In-memory MongoDB started\n');

    // Connect to in-memory DB
    await mongoose.connect(mongoUri);
    console.log('✓ Connected to database\n');

    // Define schemas
    const ProductSchema = new mongoose.Schema({
      name: String,
      slug: { type: String, unique: true },
      description: String,
      price: Number,
      category: String,
      stock: Number,
      badge: String,
      featured: Boolean,
      images: [String],
      createdAt: { type: Date, default: Date.now },
    });

    const UserSchema = new mongoose.Schema({
      name: String,
      email: { type: String, unique: true, lowercase: true },
      passwordHash: String,
      role: { type: String, enum: ['user', 'admin'], default: 'user' },
      createdAt: { type: Date, default: Date.now },
    });

    const Product = mongoose.model('Product', ProductSchema);
    const User = mongoose.model('User', UserSchema);

    // Clear existing
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('✓ Cleared existing data\n');

    // Seed products
    const products = await Product.insertMany(PRODUCTS);
    console.log(`✓ Created ${products.length} products`);
    products.forEach(p => console.log(`  - ${p.name} (€${p.price})`));

    console.log();

    // Seed admin user
    const adminPassword = await hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@fitgear.local',
      passwordHash: adminPassword,
      role: 'admin',
    });
    console.log('✓ Created admin user');
    console.log('  Email: admin@fitgear.local');
    console.log('  Password: admin123\n');

    // Seed test user
    const userPassword = await hash('user123', 10);
    const testUser = await User.create({
      name: 'Test User',
      email: 'user@fitgear.local',
      passwordHash: userPassword,
      role: 'user',
    });
    console.log('✓ Created test user');
    console.log('  Email: user@fitgear.local');
    console.log('  Password: user123\n');

    console.log('✅ Database seeded successfully!\n');
    console.log('📝 NOTE: This created an in-memory database for testing.');
    console.log('   To use a persistent database, set up MongoDB Atlas:');
    console.log('   1. Visit https://www.mongodb.com/cloud/atlas');
    console.log('   2. Create a free cluster');
    console.log('   3. Copy connection string to MONGODB_URI in .env.local\n');

  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    if (mongoServer) {
      await mongoServer.stop();
    }
  }
}

seedDatabase();
