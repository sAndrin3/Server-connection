import sql from 'mssql';
import config from '../db/config.js';


// User functions

export const getUsers = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query("SELECT * FROM users");
    !result.recordset[0]
      ? res.status(404).json({ message: 'Users not found' })
      : res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving users' });
  } finally {
    sql.close();
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    let pool = await sql.connect(config.sql);
    const result = await pool.request()
      .input("userId", sql.Int, id)
      .query("SELECT * FROM userData WHERE id = @userId");
    !result.recordset[0]
      ? res.status(404).json({ message: 'User not found' })
      : res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving user' });
  } finally {
    sql.close();
  }
};

export const createUser = async (req, res) => {
  try {
    const { id, name } = req.body;
    let pool = await sql.connect(config.sql);
    await pool.request()
      .input("UserId", sql.Int, id)
      .input("Name", sql.VarChar, name)
      .query("INSERT INTO users (UserID, Name) VALUES (@UserId, @Name)");
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the user' });
  } finally {
    sql.close();
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    let pool = await sql.connect(config.sql);
    await pool.request()
      .input("userId", sql.Int, id)
      .input("userName", sql.VarChar, name)
      .query("UPDATE userData SET name = @name WHERE id = @userId");
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the user' });
  } finally {
    sql.close();
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    let pool = await sql.connect(config.sql);
    await pool.request()
      .input("userId", sql.Int, id)
      .query("DELETE FROM userData WHERE id = @userId");
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  } finally {
    sql.close();
  }
};

// Admin functions

export const getAdmins = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query("SELECT * FROM admins");
    !result.recordset[0]
      ? res.status(404).json({ message: 'Admins not found' })
      : res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving admins' });
  } finally {
    sql.close();
  }
};

export const getAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    let pool = await sql.connect(config.sql);
    const result = await pool.request()
      .input("AdminId", sql.Int, id)
      .query("SELECT * FROM Admins WHERE AdminID = @AdminID");
    !result.recordset[0]
      ? res.status(404).json({ message: 'Admin not found' })
      : res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json(error.message);
  } finally {
    sql.close();
  }
};

export const createAdmin = async (req, res) => {
  try {
    const { id, name } = req.body;
    let pool = await sql.connect(config.sql);
    await pool.request()
      .input("adminId", sql.Int, id)
      .input("Name", sql.VarChar, name)
      .query("INSERT INTO Admins (id, Name) VALUES (@AdminId, @Name)");
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the admin' });
  } finally {
    sql.close();
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    let pool = await sql.connect(config.sql);
    await pool.request()
      .input("adminId", sql.Int, id)
      .input("adminName", sql.VarChar, name)
      .query("UPDATE Admins SET Name = @adminName WHERE id = @adminID");
    res.status(200).json({ message: 'Admin updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the admin' });
  } finally {
    sql.close();
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    let pool = await sql.connect(config.sql);
    await pool.request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Admins WHERE AdminID = @id");
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json(error.message);
  } finally {
    sql.close();
  }
};


export const getTours = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query("SELECT * FROM Tour");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Tours not found' });
    }

    res.status(200).json({ success: true, tours: result.recordset });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving tours' });
  } finally {
    sql.close();
  }
};

export const getTour = async (req, res) => {
  try {
    const { id } = req.params;
    let pool = await sql.connect(config.sql);
    const request = pool.request();
    request.input('id', sql.Int, id);
    const result = await request.query('SELECT * FROM Tour WHERE id = @id');

    if (result.recordset.length === 0) {
      return res.status(404).json(error.message);
    }

    res.status(200).json({ success: true, tour: result.recordset[0] });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the tour' });
  } finally {
    sql.close();
  }
};


// Create a new tour
export const createTour = async (req, res) => {
  try {
    const { title, description, duration, price } = req.body;
    let pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("Title", sql.VarChar, title)
      .input("Description", sql.VarChar, description)
      .input("Duration", sql.VarChar, duration)
      .input("Price", sql.Float, price)
      .query("INSERT INTO Tour (Title, Description, Duration, Price) VALUES (@Title, @Description, @Duration, @Price)");
    res.status(201).json({ message: 'Tour created successfully' });
  } catch (error) {
    res.status(500).json(error.message);
  } finally {
    sql.close();
  }
};

// Update an existing tour
export const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, duration, price } = req.body;
    
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("Title", sql.VarChar, title)
      .input("Description", sql.VarChar, description)
      .input("Duration", sql.Int, duration)
      .input("Price", sql.Float, price)
      .query("UPDATE Tour SET Title = @Title, Description = @Description, Duration = @Duration, Price = @Price WHERE id = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ success: false, error: 'Tour not found' });
    }
    
    res.json({ success: true, message: 'Tour updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'An error occurred while updating the tour' });
  } finally {
    sql.close();
  }
};

// Delete a tour
export const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;

    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Tour WHERE id = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ success: false, error: 'Tour not found' });
    }

    res.json({ success: true, message: 'Tour deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'An error occurred while deleting the tour' });
  } finally {
    sql.close();
  }
};

