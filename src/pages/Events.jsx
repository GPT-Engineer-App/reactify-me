import React, { useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Input, Text, VStack, HStack } from '@chakra-ui/react';
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from '../integrations/supabase/index.js';

const Events = () => {
  const { data: events, isLoading, isError } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [newEvent, setNewEvent] = useState({ name: '', date: '', description: '', venue_id: '' });
  const [editingEvent, setEditingEvent] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = () => {
    addEvent.mutate(newEvent);
    setNewEvent({ name: '', date: '', description: '', venue_id: '' });
  };

  const handleUpdateEvent = () => {
    updateEvent.mutate(editingEvent);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id) => {
    deleteEvent.mutate(id);
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading events</Text>;

  return (
    <Container maxW="container.md">
      <VStack spacing={4}>
        <Text fontSize="2xl">Events</Text>
        {events.map((event) => (
          <Box key={event.id} p={4} borderWidth="1px" borderRadius="lg" w="100%">
            {editingEvent && editingEvent.id === event.id ? (
              <VStack spacing={2}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input name="name" value={editingEvent.name} onChange={handleEditChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Date</FormLabel>
                  <Input name="date" value={editingEvent.date} onChange={handleEditChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input name="description" value={editingEvent.description} onChange={handleEditChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Venue ID</FormLabel>
                  <Input name="venue_id" value={editingEvent.venue_id} onChange={handleEditChange} />
                </FormControl>
                <HStack spacing={2}>
                  <Button onClick={handleUpdateEvent}>Update</Button>
                  <Button onClick={() => setEditingEvent(null)}>Cancel</Button>
                </HStack>
              </VStack>
            ) : (
              <VStack spacing={2} align="start">
                <Text>Name: {event.name}</Text>
                <Text>Date: {event.date}</Text>
                <Text>Description: {event.description}</Text>
                <Text>Venue ID: {event.venue_id}</Text>
                <HStack spacing={2}>
                  <Button onClick={() => setEditingEvent(event)}>Edit</Button>
                  <Button onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                </HStack>
              </VStack>
            )}
          </Box>
        ))}
        <Box p={4} borderWidth="1px" borderRadius="lg" w="100%">
          <VStack spacing={2}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input name="name" value={newEvent.name} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input name="date" value={newEvent.date} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input name="description" value={newEvent.description} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Venue ID</FormLabel>
              <Input name="venue_id" value={newEvent.venue_id} onChange={handleChange} />
            </FormControl>
            <Button onClick={handleAddEvent}>Add Event</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Events;