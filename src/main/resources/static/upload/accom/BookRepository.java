@Repository
public interface BookRepository extends JpaRepository<BookEntity, Integer> {
    @Query(value = "SELECT * FROM book WHERE username=:username", nativeQuery = true)
    List<BookEntity> findAllByUsername(@Param("username") String username);

    List<BookEntity> findTop5ByOrderByAccomidDesc();
}
