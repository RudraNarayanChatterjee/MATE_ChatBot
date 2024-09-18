import sqlite3

# Function to connect to the database (it will create the file if it doesn't exist)
def connect_db():
    conn = sqlite3.connect("given_info.db")
    cursor = conn.cursor()
    # Create a table for storing sites if it doesn't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS websites (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            url TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Function to add a new website to the database
def add_site(name, url):
    conn = sqlite3.connect("given_info.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO websites (name, url) VALUES (?, ?)", (name, url))
    conn.commit()
    conn.close()

# Function to get all sites from the database
def get_sites():
    conn = sqlite3.connect("given_info.db")
    cursor = conn.cursor()
    cursor.execute("SELECT name, url FROM websites")
    rows = cursor.fetchall()
    conn.close()
    return rows
