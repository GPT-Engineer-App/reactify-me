import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Container, FormControl, FormLabel, Input, Text, VStack, HStack } from '@chakra-ui/react';
import { useComments, useAddComment } from '../integrations/supabase/index.js';

const EventDetail = () => {
  const { eventId } = useParams();
  const { data: comments, isLoading, isError } = useComments();
  const addComment = useAddComment();

  const [newComment, setNewComment] = useState({ content: '', event_id: eventId });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddComment = () => {
    addComment.mutate(newComment);
    setNewComment({ content: '', event_id: eventId });
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading comments</Text>;

  const eventComments = comments.filter(comment => comment.event_id === parseInt(eventId));

  return (
    <Container maxW="container.md">
      <VStack spacing={4}>
        <Text fontSize="2xl">Event Details</Text>
        <Box p={4} borderWidth="1px" borderRadius="lg" w="100%">
          <VStack spacing={2}>
            <FormControl>
              <FormLabel>New Comment</FormLabel>
              <Input name="content" value={newComment.content} onChange={handleChange} />
            </FormControl>
            <Button onClick={handleAddComment}>Add Comment</Button>
          </VStack>
        </Box>
        {eventComments.map((comment) => (
          <Box key={comment.id} p={4} borderWidth="1px" borderRadius="lg" w="100%">
            <Text>{comment.content}</Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default EventDetail;