// Location: src/components/Dashboard/DashboardFilters.js
import React from 'react';
import { FiSearch, FiFilter, FiCalendar } from 'react-icons/fi';

function DashboardFilters({ filters, setFilters }) {
  return (
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        <FiSearch style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search clients..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.filters}>
        <div style={styles.filterItem}>
          <FiFilter style={styles.filterIcon} />
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            style={styles.select}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div style={styles.filterItem}>
          <FiCalendar style={styles.filterIcon} />
          <select
            value={filters.timeframe}
            onChange={(e) => setFilters({ ...filters, timeframe: e.target.value })}
            style={styles.select}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  searchContainer: {
    position: 'relative',
    flex: '1',
    minWidth: '300px',
  },
  searchIcon: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-secondary)',
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 2.5rem',
    borderRadius: 'var(--border-radius-md)',
    border: '1px solid var(--border-color)',
    fontSize: '0.875rem',
    transition: 'border-color 0.2s',
  },
  filters: {
    display: 'flex',
    gap: '1rem',
  },
  filterItem: {
    position: 'relative',
  },
  filterIcon: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-secondary)',
  },
  select: {
    padding: '0.75rem 1rem 0.75rem 2.5rem',
    borderRadius: 'var(--border-radius-md)',
    border: '1px solid var(--border-color)',
    fontSize: '0.875rem',
    backgroundColor: 'var(--surface)',
    cursor: 'pointer',
    minWidth: '150px',
  }
};

export default DashboardFilters;